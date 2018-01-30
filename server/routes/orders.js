const express = require('express');
const moment = require('moment');

const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Order = require('../models/order');

router.get('/',checkAuth,(req,res,next)=>{
    Order.find({user:req.userData.userId}).populate("products.product").then(orders=>{
        if(!orders){
            return res.status(404).send("No orders were found");
        }
        res.status(200).send({orders});
    }).catch(e=>{
        res.status(404).send(e);
    })
})

router.post('/',checkAuth,(req,res,next)=>{
    var order = new Order({
        products: req.body.products,
        createdAt: moment().format("Do MMM YYYY ,h:mm a"),
        user: req.userData.userId
    })
    order.save().then(order=>{
        res.status(201).send({order,message:'Your order has been submitted!'});
    }).catch(e=>{
        res.status(400).send(e);
    })
})
router.patch('/:id',checkAuth,(req,res,next)=>{
    const id = req.params.id;
    var body = req.body;
    Order.findByIdAndUpdate(id,{$set:body},{new:true}).then(order=>{
        if(!order){
            return res.status(404).send("Order was not found");
        }
        res.status(200).send({order});
    }).catch(e=>{
        res.status(400).send(e);
    })
})
router.delete('/:id',checkAuth,(req,res,next)=>{
   const id = req.params.id;
   Order.findByIdAndRemove(id).then(order=>{
       if(!order){
           return res.status(404).send("Order was not found");
       }
       res.status(200).send({order,message:'Your order has been cancelled!'});
   }).catch(e=>{
       res.status(400).send(e);
   });
})

module.exports = router;