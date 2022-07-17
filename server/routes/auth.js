const express = require('express');
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const authRouter = express.Router();

authRouter.post('/api/signup',async (req,res)=>{
   try{
        const {name,email,password} = req.body;
        
        /*crated model-> user schema->user model-> model exports using
        JS module.exports=User & HERE import using const User = require("../models/user")
        validating email from user model schema
        */
        const existingUser = await User.findOne({email});
    
        /*Email-
        existingUser will not give boolean valu 
        it just chakiing, is it excistign anythings*/
        if(existingUser){
            return res.status(400).json({msg: "User with same email already exisits!! "})
        }

        //for password hashing using bcryptjs npm package
        const hashedPassword = await bcryptjs.hash(password,8);
        
        let user = new User({
            email,
            //setting hasedPassword into user model password
            password: hashedPassword,
            name,
        })
        user = await user.save();
        res.json({user});
   }catch(e){
        res.status(500).json({error:e.message})
   }
});

//Sign In Route
//Exercise
authRouter.post('/api/signin',async (req, res)=>{
    try{
        const{email,password}= req.body;
        //finding is that email exist
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({msg: "User with this email does not exist! "});
        }
        //password matching with bcryptjs compare mathod
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg: "Incorrect Password"});
        }

    }catch(e){
        res.status(500).json({error: e.message})
    }
});

module.exports= authRouter;
