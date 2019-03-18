const Shopping = require('../models/shoppingcart');
const ProductModel = require('../models/product');
const {transformProductUser,transformProductBusiness,transformShoppingCart} = require('./merge');

module.exports = {
    shoppingcarts: async (args,req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated!');
        }
        try{
            const shopping = await Shopping.find();
            console.log(shopping)
            return shopping.map(ord =>{
                return transformShoppingCart(ord);
            })
        }catch(err){
            throw err;
        }
    },
    // This name has to be same as schema field of RootMutation
    ShoppingcartProduct: async (args,req) =>{
        if(!req.isAuth){
            throw new Error('Unauthenticated!');
        }
        //args.productId is the same name as the one mention in the RootMutation at schema/index.js
        const fetchProduct = await ProductModel.findOne({_id: args.productId})
        const shoppingcart = new Shopping({
            // user has to be same as model described
            user: '5c6437048dcdb5493fcf72c5',
            product: fetchProduct
        });
        const result = await shoppingcart.save();
        return transformShoppingCart(result);
    },
    cancelShoppingcart: async (args,req) =>{
        if(!req.isAuth){
            throw new Error('Unauthenticated!');
        }
        try{
            const shoppingcart = await Shopping.findById(args.shoppingcartId).populate('product')
            const product = transformProductUser(shoppingcart.product)
            await Shopping.deleteOne({_id: args.shoppingcartId});
            return product
        }catch(err){
            throw err;
        }
    }
}