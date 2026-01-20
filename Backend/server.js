const express=require("express")
const cors=require("cors")
const cookieParser = require('cookie-parser')   
const app=express()
const admin = require('./Routes/uploadRoute')
const exam= require('./Routes/examRoute')
const auth = require('./Routes/authRoute')
app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use('/uploads', express.static('public/uploads'));
app.use(cookieParser())
app.use('/api/admin',admin)
app.use('/api/exam',exam)
app.use('/api/auth',auth)
const PORT= process.env.SERVER_PORT || 3000
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))