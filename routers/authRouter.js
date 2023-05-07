const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { usersCollection } = require("../config/connectDB.js");
const { config } = require("dotenv");
config();

//       _____ Câu 4 _____ 
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            message: "username or password is missing",
        });
    }

    const user = await usersCollection.findOne({ username });
    if (!user) {
        return res.status(400).json({
            message: "User not found",
        });
    }
    const checkPassword = await usersCollection.findOne({ password });
    if (!checkPassword) {
        return res.status(400).json({
            message: "Password is incorrect",
        });
    }



    const token = jwt.sign(
        {
            username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "3h",
        }
    );

    // send token to client
    return res.status(200).json({
        message: "Login success",
        data: {
            token,
            username,
        },
    });
});

module.exports = { authRouter: router }