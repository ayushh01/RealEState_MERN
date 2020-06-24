const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');
//model
const Property = require('../models/Properties');

const PropertyRouter = express.Router();

PropertyRouter.use(bodyParser.json())

//**************************    About all property     ************************************ */
PropertyRouter.route('/')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200)})
.get(cors.cors ,(req,res,next)=>{
    Property.find(req.query)
    .populate('comments.author')
    .then((home)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(home);
    })
    .catch(err => console.log(err));
})

.post(cors.corsWithOptions ,authenticate.verifyUser,(req,res,next)=>{
    Property.create(req.body)
    .then((home)=>{
        console.log('Home entered: ' , home);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(home);
    })
    .catch(err => console.log(err));
})

.put(cors.corsWithOptions ,authenticate.verifyUser,(req,res,next)=>{
    res.send('Not applicable');
})

.delete(cors.corsWithOptions ,authenticate.verifyUser,(req,res,next)=>{
    Property.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => console.log(err)); 
})


/********************************* About Specific Property  ***************************************** */

PropertyRouter.route('/:homeId')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200)})
.get(cors.cors ,(req,res,next)=>{
    Property.findById(req.params.homeId)
    .populate('comments.author')
    .then((home)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(home);
    })
    .catch(err=>console.log(err));
})

.put(cors.corsWithOptions ,authenticate.verifyUser,(req,res,next)=>{
    Property.findByIdAndUpdate(req.params.homeId , {
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

.delete(cors.corsWithOptions ,authenticate.verifyUser,(req,res,next)=>{
    Property.findByIdAndRemove(req.params.homeId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})


/**************************    Comments   ************************************************** */


//export
module.exports = PropertyRouter;