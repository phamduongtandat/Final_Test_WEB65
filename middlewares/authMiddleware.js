const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config();

//       _____ Câu 5 _____ 
const authMiddleware = (req, res, next) => {
    try {

        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const { username } = jwt.verify(token, process.env.JWT_SECRET);
        if (username) {
            next();
        } else {
            throw new Error("Unauthorized");
        }
    } catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
}

module.exports = { authMiddleware }