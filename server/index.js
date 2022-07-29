//IMPORTS FOMR PACKAGES
const express = require('express');
const mongoose = require('mongoose');
const adminRouter = require('./routes/admin');

//IMPORTS FROM OTER FILES
const authRouter=require("./routes/auth");
//import './features/auth/auth_screen.dart'

//INIT
const PORT = 3000;
const app = express();
//mongoDB server linking
const DB = "mongodb+srv://ali_sojib:shokh@cluster0.ljbfg.mongodb.net/?retryWrites=true&w=majority";

//MIDDLE WARE
//CLIENT ->{MIDDLE WARE}-> SERVER -> CLIENT ->
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);

//Connection
mongoose
    .connect(DB)
    .then(()=>{
        console.log("connection successful");
    })
    .catch((e)=>{
        console.log(e);
    });

app.listen(PORT, "0.0.0.0", ()=>{
    console.log(`connected at port ${PORT} HELLO`);
})



