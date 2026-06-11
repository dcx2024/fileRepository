const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Look for the cookie you set during login (usually named 'token')
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    try {
        // Replace 'YOUR_JWT_SECRET' with your actual secret key
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); // Move to the next function (the status handler)
    } catch (err) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = { verifyToken };
