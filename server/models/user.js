const mongoose = require('mongoose');
const { productSchema } = require('./product');

const userSchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        trim: true,
    },
    email: {
        required: true,
        type: String,
        trim: true,
        validate:{
            validator: (value)=>{
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            message: "Plase enter a valid email address",
        }
    },
    password:{
        required: true,
        type: String,
        validate:{
            validator: (value)=>{
                
                return value.length>6;
            },
            message: "Plase enter a long password",
        }
    },
    address:{
        type: String,
        default: " ",
    },
    type:{
        type:String,
        default:"user",
    },

    /*
    #id
    #__v 
    will give by dfault by mongoDB*/
    
    //lettter will add CART funtonalities
    cart: [
        {
            porduct: productSchema,
            quantity:{
                type:Number,
                required: true,
            }
        }
    ],
})


const User = mongoose.model("User",userSchema);
module.exports=User;


