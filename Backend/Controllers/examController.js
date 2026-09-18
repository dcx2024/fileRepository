const { getAllExams, getExamById, deleteExam } = require('../Models/examModel');
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client } = require('../middleware/Upload'); // Update path to where you saved the file above

const fetchExams = async (req, res) => {
  const { search, limit } = req.query;

  try {
    const exams = await getAllExams(search, limit);
    res.json(exams);
  } catch (error) {
    console.error("FetchExams Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const download = async (req, res) => {
  const { filename } = req.params;

  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: filename,
    });

    // Fetch the file from S3
    const s3Item = await s3Client.send(command);

    // Set headers to trigger a file download in the browser
    res.setHeader('Content-Type', s3Item.ContentType || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Pipe the S3 read stream directly to the response
    s3Item.Body.pipe(res);

  } catch (error) {
    console.error("Download error:", error);
    if (error.name === 'NoSuchKey') {
      return res.status(404).json({ error: "File not found" });
    }
    res.status(500).json({ error: "Failed to download file" });
  }
};

const fetchById = async (req, res) => {
  const { id } = req.params;
  try {
    const exam = await getExamById(id);
    if (!exam) return res.status(404).json({ error: "Exam not found" });
    res.json(exam);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

const deleteExamById = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteExam(id);
    res.status(200).json({ message: "Upload has been successfully deleted" });
  } catch (error) {
    console.log("What happened", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  fetchExams,
  download,
  fetchById,
  deleteExamById
};