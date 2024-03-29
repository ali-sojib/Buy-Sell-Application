const mongoose = require("mongoose");
const reatingSchema = require("./rating");

const productSchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
        trim: true,
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    /*Image: {
        type: Array,
    }*/
    images:[
        {
            type: String,
            require: true,
        }
    ],
    quantity:{
        type: Number,
        require: true
    },
    price:{
        type: Number,
        require: true,
    },
    category:{
        type: String,
        require: true,
    },
    //userId

    //reating
    ratings:[reatingSchema],

});

const Product = mongoose.model('Product',productSchema);
module.exports = { Product, productSchema };