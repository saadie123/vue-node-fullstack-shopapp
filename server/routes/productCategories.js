const express = require('express');

const router = express.Router();
const categories = require("../models/productCategory");

router.post('/',(req,res,next)=>{
    var category = new categories({
        name: req.body.name
    });
    category.save();
})

module.exports = router;