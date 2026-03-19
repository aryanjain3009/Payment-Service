const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");


 /* user register controller
    POST /api/auth/register
 */


async function userRegisterController(req, res) {
    try {
        const { name, email, password } = req.body;

        const isExist = await userModel.findOne({ email: email });
        if (isExist) {
            return res.status(422).json({ message: "User already exists with email", status: "failed" });
        }

        const user = await userModel.create({ name, email, password });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
        res.cookie("token", token);
        return res.status(201).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token: token,
        });
    } catch (error) {
        console.error("Register error:", error.message);
        return res.status(500).json({ message: error.message || "Internal server error", status: "failed" });
    }
}

// User login Controller
async function userLoginController(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email: email }).select("+password");
        if (!user) {
            return res.status(404).json({ message: "User not found", status: "failed" });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password", status: "failed" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
        res.cookie("token", token);
        return res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token: token,
        });
    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({ message: error.message || "Internal server error", status: "failed" });
    }
}

module.exports = { userRegisterController, userLoginController };