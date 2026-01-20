const express=require('express')
const {signup,login}=require('../Controllers/userController')
const {verifyToken}=require('../middleware/authMiddleware')


const router=express.Router()

router.post('/create', signup)
router.post('/login', login)

router.get('/status', verifyToken, (req, res) => {
    res.status(200).json({ 
        authenticated: true, 
        user: req.user // Optional: send back username/id
    });
});

module.exports= router;