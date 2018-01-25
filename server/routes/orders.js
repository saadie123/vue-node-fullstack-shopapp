const express = require('express');
const moment = require('moment');

const router = express.Router();

const Order = require('../models/order')

router.get('/',(req,res,next)=>{
    Order.find().populate("products.product").then(orders=>{
        if(!orders){
            return res.status(404).send("No orders were found");
        }
        res.status(200).send({orders});
    }).catch(e=>{
        res.status(404).send(e);
    })
})

router.post('/',(req,res,next)=>{
    var order = new Order({
        products: req.body.products,
        createdAt: moment(new Date().getTime()).format("h:mm a")
    })
    order.save().then(order=>{
        res.status(201).send({order});
    }).catch(e=>{
        res.status(400).send(e);
    })
})
router.patch('/:id',(req,res,next)=>{
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
router.delete('/:id',(req,res,next)=>{
   const id = req.params.id;
   Order.findByIdAndRemove(id).then(order=>{
       if(!order){
           return res.status(404).send("Order was not found");
       }
       res.status(200).send({order});
   }).catch(e=>{
       res.status(400).send(e);
   });
})

module.exports = router;