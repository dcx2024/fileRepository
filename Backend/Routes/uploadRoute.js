const express= require('express')
const upload = require('../middleware/Upload');
const { uploadExam } = require('../Controllers/examUploadController');
const { verifyToken } = require('../middleware/authMiddleware');
const router= express.Router()
router.post(
  '/upload',
  upload.array('files', 10),verifyToken,
  uploadExam
);

module.exports= router