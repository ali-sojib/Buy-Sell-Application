const express = require('express');
const userRouter = express.Router();
const auth = require('../middlewares/auth');
const { Product } = require('../models/product');
const User = require('../models/user');


//you will get req as product Obj and provider user
userRouter.post('/api/add-to-cart',auth, async(req,res)=>{
    try{
        //destructuring id from req(product) body 
        //only get the { id } value from body
        const { id } = req.body;
        //geting that scpacific prodcut schema model by passing id
        const product = await Product.findById(id);
        //geting that requseted user
        let user = await User.findById(req.user);

        /* if cart has no item on his array list then
         push(add) product(req) and quantitiy 1         */
        if(user.cart.length==0){
            user.cart.push({product, quantity: 1})
        }else{
            /* else cart has alrady an item on his array list then
            now check if the req(product) alrady exist on list or NOT  */

            //by default isProductFound = false(means Not Exist)
            let isProdcutFound = false;
            //loop user cart item list lenght
            for(let i=0; i<user.cart.length; i++){
                //check if any user cart item prodcut _id(obj id) match with
                // product{req}==> ({id}=req.body) product = await Product.findById(id)
                // with equls means compare with its obj value _id
                
                if(user.cart[i].product._id.equals(product._id)){
                    //if machted isPrdocutFound true;
                    isProdcutFound= true;
                    //NOW this means 1 product is alreday added to cart now just add quantity
                }
                //product is NOT in cart add new product
            }
            
            //if isPrdocutFound true{means product is alreday in user cart NOW just incress quantity};
            if(isProdcutFound){
                /*
                 producttt= user.cart.find(like lopping)
                 if productPeram _id obj match with product _id
                 then it will return the productPeram obj and store it to producttt
                 */    
                let producttt = user.cart.find((productPeram)=> 
                    productPeram.product._id.equals(product._id)
                );
                //NOW incress that sceficif producttt by calling its obj propertiy(quantity)
                producttt.quantity+=1;
            }else{
            //if isPrdocutFound false{means product is not in user cart NOW just add this porduct};
                user.cart.push({product, quantity: 1})
            }
        }
        //NOW SAVE THIS CART CHANGE TO USER CALLING .save()
        user = await user.save();
        //sending json user response back
        res.json(user);
    }catch(e){
        res.status(500).json({error: e.message});
    }
})

module.exports= userRouter;