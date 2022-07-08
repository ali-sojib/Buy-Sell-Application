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

module.exports= authRouter;
