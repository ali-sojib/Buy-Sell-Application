const express = require('express');
const productRouter = express.Router();
const auth = require('../middlewares/auth');
const { Product }  = require('../models/product');

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


//create a post request route to rate products

productRouter.post('/api/rate-product', auth, async(req,res)=>{
    try{
        const {id,rating}=req.body;
        let product = await Product.findById(id);
        /*{
            userId: 'aaaa'
            rating: 2.5 
          },
          {
            userId:'aaaabbbbaaa'
            rating: 4
          }
         */
        for(let i=0; i<product.ratings.length; i++){
            if(product.ratings[i].userId== req.user){
                product.ratings.splice(i,1);
                break;
            }
        }

        const reatingSchema={
            userId: req.user,
            rating,
        };

        product.ratings.push(reatingSchema);
        product = await product.save();
        res.json(product);

    }catch(e){
        res.status(500).json({error: e.message})
    }
})


//crateing deal of the day 
// it will made of which prodcut gets the heights rating of all
productRouter.get('/api/deal-of-day',auth, async(req,res)=>{
    try{
        let products = await Product.find({});
        /*
        A-> 10
        B-> 30
        
        first storing rating on aSum  making one sum of rating 
        ????????????????

        soritng on two array
        7.51-7.55 h time explained
        https://www.youtube.com/watch?v=O3nmP-lZAdg&t=25597s&ab_channel=RivaanRanawat
         */
        products = products.sort((a,b)=>{
            let aSum =0;
            let bSum =0;
            for(let i=0; i < a.ratings.length; i++){
                aSum+= a.ratings[i].rating;
            }
            for(let i=0; i<b.ratings.length; i++){
                bSum+= b.ratings[i].rating;
            }
            return aSum < bSum ? 1 : -1;
        });
        
        res.json(products[0]);

    }catch(e){
        res.status(500).json({error: e.message})
    }
})



module.exports = productRouter;   
