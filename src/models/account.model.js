const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Account must be associated with a user"],
        index : true
    },
    status: {
        type: String,
        enum : {
            values : ["active", "frozen", "closed"],
        },
        default: "active",
    },
    currency : {
        type: String,
        required: [true, "Account currency cannot be empty"],
        default: "INR",
    }
},{
    timestamps: true
})

accountSchema.index({ user: 1, status: 1 });  

const accountModel = mongoose.model("account", accountSchema);

module.exports = accountModel;
