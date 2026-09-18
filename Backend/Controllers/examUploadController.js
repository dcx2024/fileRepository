const db = require('../Config/db')
const { createExamPost } = require('../Models/postModel')
const { createExamFiles } = require('../Models/fileModel')

const uploadExam = async (req, res) => {
    const { title, course_code, semester, academic_year } = req.body;
    
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        // FIX: Map the S3 file object to include the old properties 
        // so your database model (createExamFiles) can still find them.
        const formattedFiles = req.files.map((file) => ({
            ...file,
            filename: file.key,  // maps S3 key to filename
            path: file.key       // maps S3 key to path (using key so it can be downloaded later)
        }));

        await db.transaction(async (trx) => {
            const post = await createExamPost(trx, {
                title, course_code, semester, academic_year
            });

            // Pass the FORMATTED files to the model instead of req.files
            await createExamFiles(trx, post.id, formattedFiles);
        });

        return res.status(201).json({ message: "Exam uploaded successfully" });
    } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({ error: "Upload failed" });
    }
}

module.exports = {
    uploadExam
}