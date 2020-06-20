const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//model
const Property = require('../models/Properties');

const PropertyRouter = express.Router();

PropertyRouter.use(bodyParser.json())

//**************************    About all property     ************************************ */
PropertyRouter.route('/')
.get((req,res,next)=>{
    Property.find({})
    .then((home)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(home);
    })
    .catch(err => console.log(err));
})

.post((req,res,next)=>{
    Property.create(req.body)
    .then((home)=>{
        console.log('Home entered: ' , home);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(home);
    })
    .catch(err => console.log(err));
})

.put((req,res,next)=>{
    res.send('Not applicable');
})

.delete((req,res,next)=>{
    Property.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => console.log(err)); 
})


/********************************* About Specific Property  ***************************************** */

PropertyRouter.route('/:propertyId')
.get((req,res,next)=>{
    Property.findById(req.params.propertyId)
    .then((home)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(home);
    })
    .catch(err=>console.log(err));
})

.put((req,res,next)=>{
    Property.findByIdAndUpdate(req.params.propertyId , {
        $set:req.body
    },{
        new:true
    })
    .then((home)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(home);
    })
    .catch(err=>console.log(err));
})

.delete((req,res,next)=>{
    Property.findByIdAndRemove(req.params.propertyId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})


//export
module.exports = PropertyRouter;