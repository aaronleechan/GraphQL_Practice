const ProductModel = require('../models/product');
const UserModel = require('../models/user');
const BusinessOwnerModel = require('../models/businessowner');
const {dateToString} = require('../helpers/date');
//const { products} = require('./product');


const products = async productId =>{
    try{
        const products = await ProductModel.find({_id: {$in: productId}})
        products.map(product=>{
        return transformProductBusiness(product)
        });
        return products
    }catch(err){
        throw err;
    }
}

const transformProductBusiness = product => {
    return {                    
        ...product._doc,
        date: dateToString(product._doc.date),
        businessowner: businessowner.bind(this,product._doc.businessowner)
    };
}
const transformProductUser = product =>{
    return{
        ...product._doc,
        _id: product.id,
        user: user.bind(this,product.user)
    }
}
const transformShoppingCart = result =>{
    return{
        ...result._doc,
        _id: result.id,
        user:   user.bind(this,result._doc.user),
        product: singleProduct.bind(this,result._doc.product),
        createdAt: dateToString(result._doc.createdAt),
        updatedAt: dateToString(result._doc.updatedAt)
    }
}

//Async Option Return
const businessowner = async businessownerId =>{
    try{
        const businessowner = await BusinessOwnerModel.findById(businessownerId)
        console.log(businessowner + "  <&&&&&&&&&&&&&&&&&&&&");
            return {
                ...businessowner._doc, 
                createProduct: products.bind(this,businessowner._doc.createProducts)
            };
    }catch(error){
        throw error;
    }
}

const user = async userId => {
    try{
        const user = await UserModel.findById(userId)
        return{
            ...user._doc,
            _id: user.id,
        }
    }catch(error){
        throw error;
    }
}

const singleProduct = async productId =>{
    try{
        const product = await ProductModel.findById(productId)
        return transformProductUser(product)
    }catch(error){
        console.log("Inside the Single Product Error ? ")
        throw error;
    }
}

exports.transformProductBusiness = transformProductBusiness
exports.transformProductUser = transformProductUser
exports.transformShoppingCart = transformShoppingCart