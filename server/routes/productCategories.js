const express = require('express');

const router = express.Router();
const Categories = require("../models/productCategory");

router.get('/',(req,res,next)=>{
    Categories.find().then(categories=>{
        res.status(200).send({categories});
    }).catch(e=>{
        res.status(404).send(e);
    })
})

router.post('/',(req,res,next)=>{
    var category = new Categories({
        name: req.body.name
    });
    category.save();
})

module.exports = router;