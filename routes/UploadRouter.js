const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer =  require('multer');
const { findOneAndDelete } = require('../models/Users');
const cors = require('./cors');

var storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null, 'public/images');
    },
    filename:(req,file,cb) =>{
        cb(null, file.originalname)
    }
})

const imageFileFilter = (req,file,cb) =>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false)
    }
    cb(null , true);
}

const upload = multer({storage:storage , fileFilter:imageFileFilter})

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json())

//**************************   Upload    ************************************ */
uploadRouter.route('/')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200)})
.post(cors.corsWithOptions ,authenticate.verifyUser , upload.single('imageFile') , (req,res) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(req.file);
})


module.exports = uploadRouter;