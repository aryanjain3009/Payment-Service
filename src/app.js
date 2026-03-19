const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

// routes required 
const authRouter = require("./routes/auth.routes");
const accountrouter = require("./routes/account.routes");


app.use(cookieParser());    
app.use(express.json());

// use routes
app.use("/api/auth", authRouter);   
app.use("/api/account", accountrouter);   


module.exports = app;
