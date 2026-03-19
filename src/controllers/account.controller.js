const accountModel = require("../models/account.model");

const createAccountController = async (req, res) => {

    const user = req.user;
    const account = await accountModel.create({ userId: user._id });
    res.status(201).json({ data: account });
};

module.exports = { createAccountController };