const express=require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const authenticate = require('../authenticate');
const router = express.Router();
const cors = require('./cors');
//User model
const User = require('../models/Users');


router.use(bodyParser.json());

router.options('*',cors.corsWithOptions , (req,res) =>{ res.sendStatus(200);})
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
router.post('/login', cors.corsWithOptions, (req, res, next) => {

  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false, status: 'Login Unsuccessful!', err: info});
    }
    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, status: 'Login Unsuccessful!', err: 'Could not log in user!'});          
      }

      var token = authenticate.getToken({_id: req.user._id});
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true, status: 'Login Successful!', token: token});
    }); 
  }) (req, res, next);
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

router.get('/checkJWTToken' , cors.corsWithOptions , (req,res) =>{
    passport.authenticate('jwt',{session:false},(err,user,info) =>{
        if(err) {
            return res.json(err);
        if(!user) {
            res.statusCode = 401;
            res.setHeader('Content-Type','application/json');
            return res.json({status:'JWT Invalid' , success: false , err:info})
        }
        else
        {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            return res.json({status:'JWT valid' , success: true , user:user})
        }
        }
    }) (req,res);
})

module.exports = router;