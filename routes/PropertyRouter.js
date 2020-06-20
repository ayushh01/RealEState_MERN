const express = require('express');
const bodyParser = require('body-parser');

const PropertyRouter = express.Router();

PropertyRouter.use(bodyParser.json())

//**************************    About all property     ************************************ */
PropertyRouter.route('/')
.get((req,res,next)=>{
    res.end('Will send details about Properties');
})

.post((req,res,next)=>{
    res.end('Will post details of Property');
})

.put((req,res,next)=>{
    res.send('Not applicable');
})

.delete((req,res,next)=>{
    res.send('Will delete all of your property');
})


/********************************* About Specific Property  ***************************************** */

PropertyRouter.route('/:propertyId')
.get((req,res,next)=>{
    res.end('Will show ' + req.params.propertyId + ' details');
})

.put((req,res,next)=>{
    res.end('Update property details');
})

.delete((req,res,next)=>{
    res.end('Will delete this property only');
})


//export
module.exports = PropertyRouter;