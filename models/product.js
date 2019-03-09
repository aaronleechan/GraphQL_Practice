const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    product_name: {type: String, required: true},
    price: {type: Number, required: true},
    imageurl: {type: String, required: true},
    date: {type: Date, required: true},
    brandID: {type: String},
    businessowner:{ // It is Owner 
        type: Schema.Types.ObjectId,
        ref: 'businessowner_dependencies'
    }
});

module.exports = mongoose.model('products_dependencies',productSchema);