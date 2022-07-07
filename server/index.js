//IMPORTS FOMR PACKAGES
const express = require('express');

//IMPORTS FROM OTER FILES
const authRouter=require("./routes/auth");
//import './features/auth/auth_screen.dart'

//INIT
const PORT = 3000;
const app = express();

//MIDDLE WARE
//CLIENT ->{MIDDLE WARE}-> SERVER -> CLIENT ->
app.use(authRouter);


app.listen(PORT, ()=>{
    console.log(`connected at port ${PORT} HELLO`);
})



