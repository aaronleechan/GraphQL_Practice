const ProductModel = require('../models/product');
const BusinessOwnerModel = require('../models/businessowner');
const {transformProductBusiness} = require('./merge');

module.exports = {
    products: () =>{
        return ProductModel.find()
        .then(results =>{
            return results.map(product =>{
                return transformProductBusiness(product)
            })
        }).catch(err=>{
            throw err;
        })
    },
    createProduct: (args,req) =>{
        if(!req.isAuth){
            throw new Error('Unauthenticated!');
        }
        const product = new ProductModel({
            product_name: args.productInput.product_name,
            price: +args.productInput.price,
            imageurl: args.productInput.imageurl,
            date: new Date(args.productInput.date),
            brandID: Math.random().toString(),
            businessowner: '5c644593b45bb24e58135985'
        });
        let createdProduct;
        return product
                .save()
                .then(result =>{
                createdProduct = transformProductBusiness(result)
                return BusinessOwnerModel.findById('5c644593b45bb24e58135985');
        })
        .then(businessowner=>{
            if(!businessowner){
                throw new Error("Business Owner dind't Exist");
            }
            businessowner.createProducts.push(product);
            return businessowner.save();
        })
        .then(res=>{
            return createdProduct;
        })
        .catch(err => {
            throw err;
        });
    },
}