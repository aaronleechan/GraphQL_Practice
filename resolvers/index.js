const ProductModel = require('../models/product');
const UserModel = require('../models/user');
const BusinessOwnerModel = require('../models/businessowner');
const bcrypt = require('bcryptjs');
const Shoppingcart = require('../models/shoppingcart');

// const businessowner = businessownerId =>{
//     return BusinessOwnerModel.findById(businessownerId)
//     .then(res =>{
//         console.log(res);
//         console.log("business owner----------");
//         return {
//             ...res._doc, 
//             createProduct: products.bind(this,res._doc.createProducts)};
//     })
//     .catch(err=>{
//         throw err;
//     });
// }

// const products =  productId =>{
//     return ProductModel.find({_id: {$in: productId}})
//     .then(products =>{
//         console.log(products);
//         console.log("products----------");
//         return products.map(product=>{
//             return {
//                 ...product._doc,
//                 _id: product.id,
//                 date: new Date(product._doc.date).toISOString(),
//                 businessowner: businessowner.bind(this,product.businessowner)}
//         })
//     })
//     .catch(err=>{
//         throw err;
//     })
// }

//Async Option Return
const businessowner = async businessownerId =>{
    try{
        const businessowner = await BusinessOwnerModel.findById(businessownerId)
            return {
                ...businessowner._doc, 
                createProduct: products.bind(this,businessowner._doc.createProducts)
            };
    }catch(error){
        throw error;
    }
}

const products = async productId =>{
    try{
        const products = await ProductModel.find({_id: {$in: productId}})
        products.map(product=>{
        return {
            ...product._doc,
            //date: new Date(product._doc.date).toISOString(),
            businessowner: businessowner.bind(this,product.businessowner)
        };
        });
        return products
    }catch(err){
        throw err;
    }
}


module.exports = {
    products: () =>{
        return ProductModel.find()
        .then(results =>{
            return results.map(product =>{
                return{
                    ...product._doc,
                    _id: product.id,
                    date: new Date(product._doc.date).toISOString(),
                    businessowner: businessowner.bind(this,product._doc.businessowner)
                };
            })
        }).catch(err=>{
            throw err;
        })
    },
    shoppingcarts: async () => {
        try{
            const order = await Shoppingcart.find();
            return order.map(ord =>{
                return { ...ord._doc, 
                            _id: ord.id, 
                            createdAt: new Date(ord._doc.createdAt).toISOString(),
                            updatedAt: new Date(ord._doc.updatedAt).toISOString(),
                        }
            })
        }catch(err){

        }
    },
    createProduct: (args) =>{
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
                createdProduct = {
                    ...result._doc,
                    _id: result._doc.id.toString(),
                    date: new Date(result._doc.date).toISOString(),
                    businessowner: businessowner.bind(this, result.businessowner)
                };
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
    createUser: args => {
        return UserModel.findOne({email: args.userInput.email}).then(
            user=>{
                if(user){
                    throw new Error('User exists already');
                }
                return bcrypt
                .hash(args.userInput.password, 12)
            }).then(hashpassword =>{
            const user = new UserModel({
                email: args.userInput.email,
                password: hashpassword
            });
            return user.save();
        })
        .then(result =>{
            return {...result._doc,_id: result.id};
        })
        .catch(err =>{
            throw err;
        })
    },
    createBusinessOwner: args =>{
        BusinessOwnerModel.findOne({email: args.businessownerInput.email}).then(
            user => {
                if(user){
                    throw new Error("Business Owner already have account");
                }
                return bcrypt
                .hash(args.businessownerInput.password,12)
            }).then(hashpassword=>{
            const businessOwner = new BusinessOwnerModel({
                email: args.businessownerInput.email,
                password: hashpassword
            });
            return businessOwner.save()
        }).then(result=>{
            return {...result._doc}
        })
        .catch(err=>{
            throw err
        })
    }
    // This name has to be same as schema field of RootMutation
    // ShoppingcartProduct: async args =>{

    // }
}