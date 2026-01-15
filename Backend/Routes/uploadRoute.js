const express= require('express')
const upload = require('../middleware/Upload');
const { uploadExam } = require('../Controllers/examUploadController');
const router= express.Router()
router.post(
  '/upload',
  upload.array('files', 10),
  uploadExam
);

module.exports= router