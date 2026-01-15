const { getAllExams,getExamById } = require('../Models/examModel');
const path=require("path")

const fetchExams = async (req, res) => {
  const { search, limit } = req.query; // Capture limit from URL

  try {
    // If limit is passed (e.g., 20), it only gets the most recent
    const exams = await getAllExams(search, limit);
    res.json(exams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exams' });
  }
};

const download=async(req,res)=>{
  const {filename}= req.params;
  const file_path=path.join(__dirname,'../public/uploads',filename)
  res.download(file_path,filename,(err)=>{
    if(err){
      console.error("Download error:",err);
      res.status(404).json({error:"File not found"})
    }
  })
}

const fetchById=async(req,res)=>{
  const {id}=req.params;
  try{
    const exam=await getExamById(id);
    if(!exam) return res.status(404).json({error:"Exam not found"})
      res.json(exam)
  }catch(error){
    res.status(500).json({error:"Server Error"})
  }
}

module.exports = {
  fetchExams,download,fetchById
};