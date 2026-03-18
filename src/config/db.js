const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB is connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}; 

module.exports = connectToDB;   