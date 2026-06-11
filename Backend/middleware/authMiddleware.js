const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    try {
        // Remove the fallback 'secret_key' so it forces usage of the environment variable
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); 
    } catch (err) {
        console.error("JWT Verification Error:", err.message); // Log the exact error to Render
        res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = { verifyToken };
