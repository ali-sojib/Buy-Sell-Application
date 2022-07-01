console.log('hello world');

const express = require('express');
//like import 'package:express/express.dart
const PORT = 3000;
const app = express();

//CREATING AN API
//http://<ipaddress>hello-word
app.get("/hello-world", (req,res)=>{
    res.json({hi: "hello world"});
})
//GET, PUT, POST, DELETE, UPDATE ->CURD


app.listen(PORT, ()=>{
    console.log(`connected at port ${PORT} HELLO`);
})



