const mongoose = require('mongoose');

var productCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Categories',productCategorySchema);