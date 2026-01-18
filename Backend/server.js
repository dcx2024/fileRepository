const express=require("express")
const cors=require("cors")
const app=express()
const admin = require('./Routes/uploadRoute')
const exam= require('./Routes/examRoute')
app.use(express.json())
app.use(cors({
    origin:['http://localhost:5173','https://filerepository-1.onrender.com']
}))
app.use('/uploads', express.static('public/uploads'));
app.use('/api/admin',admin)
app.use('/api/exam',exam)
const PORT= process.env.SERVER_PORT || 3000
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
