const {Router} = require("express");
const transactionController = require("../controllers/transaction.controller");
const {authMiddleware, authSystemUserMiddleware} = require("../middleware/auth.middleware");
const transactionRoutes = Router();


// POST api/transaction, Create new transaction

transactionRoutes.post("/", authMiddleware, transactionController.createTransaction);

transactionRoutes.post("/system/initial-funds", authSystemUserMiddleware, transactionController.createInitialFundsTransaction);


module.exports = transactionRoutes;
