const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost/Store');
mongoose.Promise = global.Promise;
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const categoryRoutes = require('./routes/productCategories');

app.use(bodyParser.json());

app.use('/users',userRoutes);
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/categories',categoryRoutes);


const port = process.env.PORT || 5050;
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})
