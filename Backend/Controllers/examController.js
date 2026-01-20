const { getAllExams,getExamById,deleteExam } = require('../Models/examModel');
const path=require("path")

const fetchExams = async (req, res) => {
  const { search, limit } = req.query; // Capture limit from URL

  try {
    // If limit is passed (e.g., 20), it only gets the most recent
    const exams = await getAllExams(search, limit);
    res.json(exams);
  } catch (error) {
    console.error("FetchExams Error:", error);
    res.status(500).json({ error: error.message });
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

const deleteExamById=async(req,res)=>{
  const {id} = req.params;

  try{
    await deleteExam(id);
    res.status(200).json({message:"Upload has been successfully deleted"})
  }catch(error){
    res.status(500).json({error:"An error occurred"})
    console.log("What happened", error)
  }
}

module.exports = {
  fetchExams,download,fetchById,deleteExamById
};