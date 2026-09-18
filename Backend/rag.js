import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import OpenAI from 'openai';
import { db } from './db.js';

// Initialize OpenAI SDK pointing to NVIDIA's NIM endpoints
const openai = new OpenAI({
    apiKey: process.env.NVIDIA_API_KEY,
    baseURL: 'https://integrate.api.nvidia.com/v1',
});

// Define the models
const EMBEDDING_MODEL = 'nvidia/nv-embedqa-e5-v5'; // Outputs 1024 dimensions
const CHAT_MODEL = 'deepseek-ai/deepseek-v4-flash-0731';

/**
 * Splits text, generates embeddings via NVIDIA, and inserts into pgvector.
 */
export async function processAndEmbed(rawText, metadata = {}) {
    if (!rawText || rawText.length === 0) throw new Error('Document contains no text.');

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });
    const chunks = await splitter.createDocuments([rawText]);

    const records = await Promise.all(
        chunks.map(async (chunk, index) => {
            // Generate embeddings using NVIDIA NIM API
            const response = await openai.embeddings.create({
                model: EMBEDDING_MODEL,
                input: chunk.pageContent,
                input_type: "passage" // Recommended parameter for e5 models
            });

            const embeddingString = `[${response.data[0].embedding.join(',')}]`;

            return {
                content: chunk.pageContent,
                metadata: JSON.stringify({ ...metadata, chunkIndex: index }),
                embedding: db.raw('?::vector', [embeddingString]),
            };
        })
    );

    await db('documents').insert(records);
    return records.length;
}

/**
 * Standard Chat Query (No Streaming)
 */
export async function queryRAG(userQuery) {
    // 1. Embed user query
    const queryEmbed = await openai.embeddings.create({
        model: EMBEDDING_MODEL,
        input: userQuery,
        input_type: "query"
    });
    const embeddingString = `[${queryEmbed.data[0].embedding.join(',')}]`;

    // 2. Search Database
    const rows = await db('documents')
        .select(
            'content',
            db.raw('1 - (embedding <=> ?::vector) AS similarity_score', [embeddingString])
        )
        .orderByRaw('embedding <=> ?::vector', [embeddingString])
        .limit(4);

    const context = rows.map((row) => row.content).join('\n\n---\n\n');

    // 3. Query DeepSeek via NVIDIA NIM
    const completion = await openai.chat.completions.create({
        model: CHAT_MODEL,
        messages: [
            {
                role: "system",
                content: "You are an assistant. Answer using ONLY the context provided.\n\nContext:\n" + context
            },
            { role: "user", content: userQuery }
        ],
        temperature: 1,
        top_p: 0.95,
        max_tokens: 16384,
        chat_template_kwargs: { thinking: true, reasoning_effort: "high" },
        stream: false
    });

    // Extract reasoning (if any) and content
    const msg = completion.choices[0]?.message;
    const reasoning = msg?.reasoning || msg?.reasoning_content || "";
    const answer = msg?.content || "";

    return {
        answer: reasoning ? `[Thinking Process]:\n${reasoning}\n\n[Answer]:\n${answer}` : answer,
        sources: rows
    };
}

/**
 * SSE Streaming Chat Query (for the /api/chat endpoint)
 */
export async function* queryRAGStream(userQuery) {
    const queryEmbed = await openai.embeddings.create({
        model: EMBEDDING_MODEL,
        input: userQuery,
        input_type: "query"
    });
    const embeddingString = `[${queryEmbed.data[0].embedding.join(',')}]`;

    const rows = await db('documents')
        .select('content')
        .orderByRaw('embedding <=> ?::vector', [embeddingString])
        .limit(4);

    if (rows.length === 0) {
        yield "No documents found.";
        return;
    }

    const context = rows.map((row) => row.content).join('\n\n---\n\n');

    // Execute Streaming completion
    const stream = await openai.chat.completions.create({
        model: CHAT_MODEL,
        messages: [
            {
                role: "system",
                content: "You are an assistant. Answer using ONLY the context provided.\n\nContext:\n" + context
            },
            { role: "user", content: userQuery }
        ],
        temperature: 1,
        top_p: 0.95,
        max_tokens: 16384,
        chat_template_kwargs: { thinking: true, reasoning_effort: "high" },
        stream: true
    });

    // Yield DeepSeek's reasoning and content chunks as they arrive
    for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta;
        const text = delta?.reasoning_content || delta?.content || "";
        if (text) {
            yield text;
        }
    }
}