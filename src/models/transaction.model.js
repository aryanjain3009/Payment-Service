const mongoose = require("mongoose");   

const transactionSchema = new mongoose.Schema({
    fromAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "Transaction must be associated with a from account"],
        index: true
    },
    toAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "Transaction must be associated with a to account"],
        index: true
    },
    status: {
        type: String,
        enum: {
            values: ["pending", "completed", "failed", "reversed"],
            message: "Status can be either pending, completed, failed or reversed"
              },
        default: "pending",
    },
    amount: {
        type: Number,
        required: [true, "Transaction amount cannot be empty"],
        min : [0, "Transaction amount cannot be negative"],
    },
    idempotencyKey: {
        type: String,
        required: [true, "Idempotency key is required to create a transaction"],
        unique: true,
        index: true
    },
},{timestamps: true});

const transactionModel = mongoose.model("transaction", transactionSchema);

module.exports = transactionModel;
