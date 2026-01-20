const express=require('express')
const router=express.Router()
const {fetchExams,fetchById,download,deleteExamById} = require("../Controllers/examController")
router.get('/fetchExams',fetchExams)
router.get('/:id',fetchById)
router.get('/download/:filename',download)
router.delete('/delete/:id',deleteExamById)
module.exports= router;