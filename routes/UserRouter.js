const express=require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const authenticate = require('../authenticate');
const router = express.Router();
const cors = require('./cors');
//User model
const User = require('../models/Users');


router.use(bodyParser.json());


//signup
router.post('/signup',cors.corsWithOptions ,(req,res,next)=>{
    User.register(new User({username:req.body.username}),req.body.password , (err,user)=>{
        if(err)
        {
            res.statusCode = 500;
            res.setHeader('Content-Type','application/json');
            res.json({err:err});
        }
        else
        {
            if(req.body.firstname)
                user.firstname = req.body.firstname;
            if(req.body.lastname)
                user.lastname = req.body.lastname;
            user.save((err,user)=>{
                if(err)
                {
                    res.statusCode = 500;
                    res.setHeader('Content-Type','application/json');
                    res.json({err:err});
                }
                passport.authenticate('local')(req,res ,() =>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json');
                    res.json({success:true , status:'Registration Successfull' , user:user})
                })
            })     
        }
    })
})



//Login
router.post('/login',cors.corsWithOptions ,passport.authenticate('local') ,(req,res)=>{
    var token = authenticate.getToken({_id:req.user._id})
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json({success:true ,token:token , status:'You are now Logged in'})
});

//logout
router.get('/logout',cors.corsWithOptions ,(req,res,next)=>{
    if(req.session)
    {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    }
    else
    {
        var err = 'You are not logged in';
        err.status = 403;
        res.json(err);
    }
})

module.exports = router;