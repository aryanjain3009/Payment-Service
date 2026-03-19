const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Account must be associated with a user"],
    },
    status: {
        enum : {
            values : ["active", "frozen", "closed"],
            message : "Account status must be active or frozen or closed",
        },
    },
    currency : {
        type: String,
        required: [true, "Account currency cannot be empty"],
        default: "INR",
    }
},{
    timestamps: true
})

const accountModel = mongoose.model("account", accountSchema);

module.exports = accountModel;
