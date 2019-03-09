const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    orders:[
        {
            type: Schema.Types.ObjectId,
            ref: 'products_dependencies'
        }
    ]
})
module.exports = mongoose.model('User_dependencies',userSchema);