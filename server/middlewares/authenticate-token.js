const jwt = require('jsonwebtoken');

const authenticateToken = (req , res , next) => {
    const token = req.cookies.accessToken; 
    if(!token) {
        return res.status(401).json({ message: "Access token is required!" });
    }
    try {
        const decodedToken = jwt.verify(token , process.env.JWT_SECRET);
        req.user = decodedToken;
        next(); // Bir sonraki middleware'e geçin
    }
    catch(error){
        console.error("Token verification failed:", error);
        return res.status(403).json({ message: "Invalid or expired token!" });
    }
};

module.exports = authenticateToken;