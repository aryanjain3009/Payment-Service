const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();


app.use(cookieParser());    
app.use(express.json());


// routes required 
const authRouter = require("./routes/auth.routes");
const accountrouter = require("./routes/account.routes");
const transactionRouter = require("./routes/transaction.routes");

// use routes
app.use("/api/auth", authRouter);   
app.use("/api/account", accountrouter);   
app.use("/api/transaction", transactionRouter);   

module.exports = app;
