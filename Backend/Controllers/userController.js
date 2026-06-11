const { createUser, getUserByUsername } = require("../Models/userModel")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(404).json({ message: "An error occured" })
        }
        const existing = await getUserByUsername(username)
        if (existing) {
            return res.status(400).json({ message: "User already Exists" })
        }

        const password_hash = await bcrypt.hash(password, 10);

        const newUser = await createUser({
            username: username, password_hash
        })

        const token = jwt.sign(
            { id: newUser.id, username: newUser.username }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h', algorithm: 'HS256' }
        )

        // Hardcoded raw production values for cross-domain tracking on Render
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,      // Required for Render HTTPS
            sameSite: 'none',   // Required for cross-domain tracking
            maxAge: 24 * 60 * 60 * 1000 
        })

        console.log('Signup Successful')
        res.status(200).json({ message: "Signup successful" })
    } catch (error) {
        console.error("Error in signup process", error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password required" })
        }

        const existing = await getUserByUsername(username)
        if (!existing) {
            return res.status(401).json({ message: "User not found" })
        }

        const match = await bcrypt.compare(password, existing.password_hash)
        if (!match) {
            return res.status(401).json({ message: "Invalid password" })
        }

        const token = jwt.sign(
            { id: existing.id, username: existing.username }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h', algorithm: "HS256" }
        )

        // Hardcoded raw production values for cross-domain tracking on Render
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,      // Required for Render HTTPS
            sameSite: 'none',   // Required for cross-domain tracking
            maxAge: 24 * 60 * 60 * 1000 
        })

        res.status(200).json({ message: "Login successful" })
    } catch (error) {
        console.error('Error during user Authentication', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = { signup, login }
