const express = require('express');

const authRouter = express.Router();

authRouter.post('/api/signup',(req,res)=>{
    // console.log(req.body);
    /*
    {
        'name': name,
        'email': email,
        'password':password
        for these value and key we have to declared saparate 
        varibale but in JS we can just set in const like destructuring
    }
    */
    const {name,email,password} = req.body;
    //get the data form client
    //post that data in database
    //return that data in the user
});

module.exports= authRouter;
