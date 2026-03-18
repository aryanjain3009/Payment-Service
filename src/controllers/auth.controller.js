const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");


 /* user register controller
    POST /api/auth/register
 */


async function userRegisterController(req, res) {
    const { name, email, password } = req.body;

    const isExist = await userModel.findOne({ email:email });
    if (isExist) {
        return res.status(422).json({ message: "User already exists with email", status: "failed" });
    }

    const user = await userModel.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
    res.cookie("token", token);
    return res.status(201).json({ user : {
        _id: user._id,
        name: user.name,
        email: user.email,  
    }, token: token});

}   

module.exports = { userRegisterController };