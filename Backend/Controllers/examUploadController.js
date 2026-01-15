const db=require('../Config/db')
const { createExamPost} = require('../Models/postModel')
const { createExamFiles }= require('../Models/fileModel')

const uploadExam =async(req,res)=>{
    const {title,course_code, semester,academic_year} = req.body;
    if(!req.files || req.files.length === 0){
        return res.status(400).json({error: "No file uploaded"})
    }

    try{
        await db.transaction(async (trx)=>{
            const post = await createExamPost(trx,{
                title,course_code,semester,academic_year
            })

            await createExamFiles(trx,post.id,req.files)
        })

        return res.status(201).json({message:"Exam uploaded succesfully"})
    }catch(error){
        console.error("Upload error:", error);
        return res.status(500).json({error: "Upload failed"})
    }


}

module.exports ={
    uploadExam
}