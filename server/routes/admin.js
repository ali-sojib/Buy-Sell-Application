const express = require('express');
const adminRouter = express.Router();
const admin = require('../middlewares/admin');
const Product  = require('../models/product');

//add product
// /admin/add-product
adminRouter.post('/admin/add-product', admin, async (req,res)=>{
    try{
        /*
        
      'name': name,
      'description': description,
      'quantity': quantity,
      'images': images,
      'category': category,
      'price': price,
      'id': id,
         */
        const{name,description,images,quantity,price,category} = req.body;
        let product = new Product({
            name,
            description,
            images,
            quantity,
            price,
            category,
        });
        product = await product.save();
        res.json(product);
    }catch(e){
        res.status(500).json({error: e.message})
    }
});

module.exports = adminRouter;


