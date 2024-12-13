const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

// Enabling Cors
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("Connected to Database"))
.catch((err)=>{console.log("Error while connecting to DB ,", err);})


// Importing routes
const hiiRoute = require("./routes/hiii");
const signRoute = require("./routes/signup");
const initialiseRoute = require("./routes/initializeExpenser");
const loginRoute = require("./routes/login");
const updateRoute = require("./routes/Updater");
const todayRoute = require("./routes/today");

// using routes
app.use("/hii",hiiRoute);
app.use("/signup",signRoute);
app.use("/initialise",initialiseRoute);
app.use("/login",loginRoute);
app.use("/update",updateRoute);
app.use("/today",todayRoute);

// Server turning on
app.listen(process.env.PORT, ()=>console.log(`Server running on port:${process.env.PORT}`))


module.export = app;