const express = require('express');

const router = express.Router();

const Product = require('../models/product');

router.get('/',(req,res,next)=>{
    Product.find().populate("category").then(products=>{
        if(!products){
           return res.status(404).send("No products were found");
        }
        res.status(200).send({products});
    }).catch(e=>{
        res.status(404).send(e);
    });
})
router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    Product.findById(id).populate("category").then(product=>{
        if(!product){
            return res.status(404).send("Product not found");
        }
        res.status(200).send({product});
    }).catch(e=>{
        res.status(404).send(e);
    });
})

router.post('/',(req,res,next)=>{
    var product = new Product({
        name: req.body.name,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        category: req.body.category
    });
    product.save().then(product=>{
        res.status(201).send({product});
    }).catch(e=>{
        res.status(400).send(e);
    });
})
router.patch('/:id',(req,res,next)=>{
    const id = req.params.id;
    var body = req.body
    Product.findByIdAndUpdate(id,{$set:body},{new:true})
    .then(product=>{
        res.status(200).send({product});
    }).catch(e=>{
        res.status(400).send(e);
    });
})
router.delete('/:id',(req,res,next)=>{
    const id = req.params.id;
    Product.findByIdAndRemove(id).then(product=>{
        if(!product){
            return res.status(404).send("Product not found");
        }
        res.status(200).send({product});
    });
})

module.exports = router;