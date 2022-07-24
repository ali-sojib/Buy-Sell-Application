const express = require('express');
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');

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
        const token = jwt.sign({id: user._id}, "passwordKey")
        res.json({token,...user._doc});
        
    }catch(e){
        res.status(500).json({error: e.message})
    }
});

//token validation api
authRouter.post('/tokenIsValid',async (req,res)=>{
    try{
        const token = req.header('x-auth-token');
        if(!token) return res.json(false);
        
        const verified = jwt.verify(token,'passwordKey')
        if(!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if(!user) return res.json(false);

        res.json(true);
    }catch(e){
        res.status(500).json({error: e.message});
    }
})


//get user data api
authRouter.get('/', auth, async (req,res) => {
    const user = await User.findById(req.user);
    res.json({...user._doc, token:req.token});

})

module.exports= authRouter;
