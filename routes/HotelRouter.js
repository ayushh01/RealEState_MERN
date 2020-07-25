const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');
//model
const Hotel = require('../models/Hotels');

const HotelRouter = express.Router();

HotelRouter.use(bodyParser.json())

//**************************    About all property     ************************************ */
HotelRouter.route('/')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200)})
.get(cors.cors ,(req,res,next)=>{
    Hotel.find(req.query)
    .populate('comments.author')
    .then((home)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(home);
    })
    .catch(err => console.log(err));
})

.post(cors.corsWithOptions ,authenticate.verifyUser,(req,res,next)=>{
    Hotel.create(req.body)
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
    Hotel.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => console.log(err)); 
})


/********************************* About Specific Property  ***************************************** */

HotelRouter.route('/:homeId')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200)})
.get(cors.cors ,(req,res,next)=>{
    Hotel.findById(req.params.homeId)
    .populate('comments.author')
    .then((home)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(home);
    })
    .catch(err=>console.log(err));
})

.put(cors.corsWithOptions ,authenticate.verifyUser,(req,res,next)=>{
    Hotel.findByIdAndUpdate(req.params.homeId , {
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
    Hotel.findByIdAndRemove(req.params.homeId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})


/**************************    Comments   ************************************************** */


//export
module.exports = HotelRouter;