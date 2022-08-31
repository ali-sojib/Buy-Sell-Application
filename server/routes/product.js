const express = require('express');
const productRouter = express.Router();
const auth = require('../middlewares/auth');
const Product  = require('../models/product');

/*get all product

 /api/product?category=Essentials
 /api/amazon?theme=dark 
to get data like these inside find write 
 "req.query.theme"

/api/products:category=Essentials
to get data like these inside find write
 "req.params.category"
*/


productRouter.get('/api/products', auth, async(req,res)=>{
    try{
        const products = await Product.find({category: req.query.category});
        res.json(products);
    }catch(e){
        res.status(500).json({error: e.message});
        
        console.log("inside route product.js");
    }
});

/*
carete a get request to search product and get them
 api/products/search/i

*/
//productRouter.get('/api/products/search/:name/:great', auth, async(req,res)=>{
productRouter.get('/api/products/search/:name', auth, async(req,res)=>{
    try{
        const products = await Product.find({
            name: {$regex: req.params.name, $options:"i"},
        });
        res.json(products);
    }catch(e){
        res.status(500).json({error: e.message});
        console.log('inside route product.js')
    }
})



module.exports = productRouter;   
