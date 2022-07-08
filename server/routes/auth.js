const express = require('express');
const User = require("../models/user")

const authRouter = express.Router();

authRouter.post('/api/signup',async (req,res)=>{
    
    //get the data form client
    const {name,email,password} = req.body;
    
    /* validating email from user model schema */
    const existingUser = await User.findOne({email});
   
    /*Email-
    existingUser will not give boolean valu 
    it just chakiing, is it excistign anythings*/
    if(existingUser){
        return res.status(400).json({msg: "User with same email already exisits!! "})
    }
    //return that data in the user
});

module.exports= authRouter;
