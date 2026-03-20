const mongoose = require("mongoose");
const transactionModel = require("../models/transaction.model");
const ledgerModel = require("../models/ledger.model");
const accountModel = require("../models/account.model");
const emailService = require("../services/email.service");

/**
** Create a new transaction 
* The 10 step transaction flow

    * 1. validate request
    * 2. check idempotency key
    * 3. check account status
    * 4. derive sender balance from ledger
    * 5. create transaction (pending)
    * 6. create DEBIT ledger entries
    * 7. create CREDIT ledger entries
    * 8. Mark transaction  completed
    * 9. Commit MongoDB session
    * 10. Send Email notification 
 */

async function createTransaction(req, res) {
    const { fromAccount, toAccount, amount, idempotencyKey } = req.body;

}

async function createInitialFundsTransaction(req, res) {
    const { toAccount, amount, idempotencyKey } = req.body;

    if (!toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const toUserAccount = await accountModel.findOne({
        _id: new mongoose.Types.ObjectId(toAccount)
    });

    if (!toUserAccount) {
        return res.status(400).json({ message: "User account not found" });
    }

    const fromUserAccount = await accountModel.findOne({
        userId: req.user._id
    });
    if (!fromUserAccount) {
        return res.status(400).json({ message: "User account not found" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    const transaction = new transactionModel({
        fromAccount: fromUserAccount._id,
        toAccount,
        amount,
        idempotencyKey,
        status: "pending",
    });

    const debitLedgerEntry = new ledgerModel([{
        account: fromUserAccount._id,
        transaction: transaction._id,
        amount: amount,
        type: "debit",
    }], { session });

    const creditLedgerEntry = new ledgerModel([{
        account: toUserAccount._id,
        transaction: transaction._id,
        amount: amount,
        type: "credit",
    }], { session });

    transaction.status = "completed";
    await transaction.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({ message: "Initial funds transaction completed successfully", transaction: transaction });
}






module.exports = { createTransaction, createInitialFundsTransaction };