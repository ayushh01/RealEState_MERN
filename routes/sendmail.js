const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');
const nodemailer = require("nodemailer");
//model

const mailRouter = express.Router();

mailRouter.use(bodyParser.json())

//**************************    About all property     ************************************ */
mailRouter.route('/')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200)})
.post(cors.corsWithOptions , (req,res,next)=>{
    if(req.body != null) {
        let user = req.body.email;
        sendMail(user, info => {
        console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
        res.send(info);
        });
    }
    else
    {
        err = 'Comment not found in request';
        err.status = 404;
        res.json(err);
    } 
})

async function sendMail(user, callback) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'help.realestateee@gmail.com',
        pass: 'realestate@12'
      }
    });
  
    let mailOptions = {
      from: 'help.realestateee@gmail.com', // sender address
      to: user, // list of receivers
      subject: "Help form RealEstate", // Subject line
      text: "Thank you for connecting us we will reach to you soon.",
      html: `<h1>Thank you for visiting my project!</h1>`
    };
  
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
  
    callback(info);
  }


module.exports = mailRouter;