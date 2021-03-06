const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const User = require('../models/user');
router.post('/signup',(req,res,next)=>{
    User.findOne({email:req.body.email}).then(user=>{
        if(!user){
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).send(err);
                };
                var user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    phone: req.body.phone,
                    address: req.body.address
                });
                user.save().then(user=>{
                    var token = jwt.sign({userId:user._id,name:user.name,email:user.email,phone:user.phone,address:user.address},'iusecrazystring',{
                        expiresIn: '1h'
                    });
                    res.status(201).send({
                        token,
                        userData:{
                            name: user.name,
                            phone:user.phone,
                            address:user.address,
                            email: user.email,
                            loggedInAt: new Date().getTime()
                        },
                        message:"Registered Successfuly. You are now logged in!"
                    });
                }).catch(e=>{
                    res.status(400).send(e);
                });
            });
        } else {
            res.status(400).send({error: "An account is already registered with this email!"});
        }
    })
});

router.post('/login',(req,res,next)=>{
    User.findOne({email:req.body.email}).then(user=>{
        if(!user){
            return res.status(404).send({error:"Email or password is incorrent!"});
        };
        bcrypt.compare(req.body.password,user.password,(err,result)=>{
            if(result){
                var token = jwt.sign({userId:user._id,name:user.name,email:user.email,phone:user.phone,address:user.address},'iusecrazystring',{
                    expiresIn: '1h'
                });
                res.status(200).send({
                    token,
                    userData:{
                        name: user.name,
                        phone:user.phone,
                        address:user.address,
                        email: user.email,
                        loggedInAt: new Date().getTime()
                    },
                    message:"You have successfuly logged in!"
                });
            }
            else{
                res.status(404).send({error:"Email or password is incorrent!"});
            }
        });
    });
});

router.post('/profile',checkAuth,(req,res,next)=>{
        const userData = req.body;
        User.findOneAndUpdate({email:req.userData.email},{$set:userData},{new:true}).then(user=>{
            if(!user){
                return res.status(404).send({error:'User with this email was not found!'});
            }
            res.status(200).send({message:'Your profile has been updated!'});
        }).catch(e=>{
            res.status(400).send({error:'An account is already registered with this email!'});
        });
})

module.exports = router;