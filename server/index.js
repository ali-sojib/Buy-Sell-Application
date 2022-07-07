//IMPORTS FOMR PACKAGES
const express = require('express');
const mongoose = require('mongoose');

//IMPORTS FROM OTER FILES
const authRouter=require("./routes/auth");
//import './features/auth/auth_screen.dart'

//INIT
const PORT = 3000;
const app = express();
const DB = "mongodb+srv://ali_sojib:shokh@cluster0.ljbfg.mongodb.net/?retryWrites=true&w=majority";
//MIDDLE WARE
//CLIENT ->{MIDDLE WARE}-> SERVER -> CLIENT ->
app.use(authRouter);

//Connection
mongoose
    .connect(DB)
    .then(()=>{
        console.log("connection successful");
    })
    .catch((e)=>{
        console.log(e);
    });

app.listen(PORT, ()=>{
    console.log(`connected at port ${PORT} HELLO`);
})



