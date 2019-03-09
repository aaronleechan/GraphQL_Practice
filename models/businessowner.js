const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const businessownerSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    createProducts:[
        {
            type: Schema.Types.ObjectId,
            ref: 'products_dependencies'
        }
    ]
});
module.exports = mongoose.model('businessowner_dependencies', businessownerSchema);