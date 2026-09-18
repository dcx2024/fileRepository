import fs from 'fs/promises';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import officeParser from 'officeparser';
import Tesseract from 'tesseract.js';

export async function extractText(filePath, mimeType) {
    try {
        switch (mimeType) {
            // PDF documents
            case 'application/pdf': {
                const buffer = await fs.readFile(filePath);
                const data = await pdfParse(buffer);
                return data.text.trim();
            }

            // Word documents (.docx, .doc)
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            case 'application/msword': {
                const result = await mammoth.extractRawText({ path: filePath });
                return result.value.trim();
            }

            // PowerPoint presentations (.pptx, .ppt)
            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            case 'application/vnd.ms-powerpoint': {
                const text = await officeParser.parseOfficeAsync(filePath);
                return text.trim();
            }

            // Image OCR (.png, .jpg, .jpeg, .webp)
            case 'image/png':
            case 'image/jpeg':
            case 'image/jpg':
            case 'image/webp': {
                const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
                return text.trim();
            }

            default:
                throw new Error(`Unsupported MIME type: ${mimeType}`);
        }
    } catch (error) {
        throw new Error(`Text extraction failed for ${filePath}: ${error.message}`);
    }
}