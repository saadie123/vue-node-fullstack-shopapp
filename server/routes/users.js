const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../models/user');
router.post('/signup',(req,res,next)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).send(err);
        };
        console.log(hash);
        var user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            phone: req.body.phone,
            address: req.body.address
        });
        user.save().then(user=>{
            res.status(201).send({user,message:"Registered Successfuly. You can login to your account now!"});
        }).catch(e=>{
            res.status(400).send(e);
        });
    });
});

module.exports = router;