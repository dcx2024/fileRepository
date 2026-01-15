const express=require('express')
const router=express.Router()
const {fetchExams,fetchById,download} = require("../Controllers/examController")
router.get('/fetchExams',fetchExams)
router.get('/:id',fetchById)
router.get('/exam/download/:filename',download)

module.exports= router;