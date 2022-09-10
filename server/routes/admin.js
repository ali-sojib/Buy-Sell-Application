const express = require('express');
const adminRouter = express.Router();
const admin = require('../middlewares/admin');
const { Product }  = require('../models/product');

//add product
// /admin/add-product
adminRouter.post('/admin/add-product', admin, async (req,res)=>{
    try{
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

//get all product
adminRouter.get('/admin/get-products', admin, async(req,res)=>{
    try{
        const product = await Product.find({});
        res.json(product);

    }catch(e){
        res.status(500).json({error: e.message});
    }
});

//delet products
adminRouter.post('/admin/delete-product', admin,async(req,res)=>{
    try{
        const {id} = req.body;
        const product = await Product.findByIdAndDelete(id)
        res.json(product);
    }catch(e){
        res.status(500).json({error: e.message});
    }
})


module.exports = adminRouter;   


