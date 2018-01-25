const mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: {
        type: String,
        minlength:3,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
        required: true
    }
});

module.exports = mongoose.model('Product',productSchema);