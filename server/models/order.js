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
    }
});

module.exports = mongoose.model('Order',orderSchema);