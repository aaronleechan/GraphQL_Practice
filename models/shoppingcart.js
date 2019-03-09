const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shoppingCart = new Schema({
    product:{
        type: Schema.Types.ObjectId,
        ref: 'products_dependencies'
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User_dependencies'
    }
},{
    timestamps: true
})

module.exports = mongoose.model('ShoppingCart_dependencies',shoppingCart);