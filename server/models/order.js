const mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    products:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            },
        }
    ],
    createdAt: {
        type: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = mongoose.model('Order',orderSchema);