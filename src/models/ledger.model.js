const mongoose = require("mongoose");   

const ledgerSchema = new mongoose.Schema({
    account : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "account",
        required : [true, "Ledger must be associated with an account"],
        index : true,
        immutable : true
    },
    transaction : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "transaction",
        required : [true, "Ledger must be associated with a transaction"],
        index : true,
        immutable : true
    },
    amount : {
        type : Number,
        required : [true, "Ledger amount cannot be empty"],
        immutable : true,
    },
    type : {
        type : String,
        enum : {
            values : ["credit", "debit"],
            message : "Ledger type can be either credit or debit"
        },
        required : [true, "Ledger type cannot be empty"],
        immutable : true
    }
},{timestamps: true});

function preventLedgerModification() { 
    throw new Error("Ledger cannot be modified, they are immutable");
}

ledgerSchema.pre("save", preventLedgerModification);
ledgerSchema.pre("updateOne", preventLedgerModification);
ledgerSchema.pre("updateMany", preventLedgerModification);
ledgerSchema.pre("findOneAndUpdate", preventLedgerModification);
ledgerSchema.pre("deleteOne", preventLedgerModification);
ledgerSchema.pre("deleteMany", preventLedgerModification);
ledgerSchema.pre("findOneAndDelete", preventLedgerModification);
ledgerSchema.pre("findOneAndReplace", preventLedgerModification);
ledgerSchema.pre("remove", preventLedgerModification);

const ledgerModel = mongoose.model("ledger", ledgerSchema);

module.exports = ledgerModel;
