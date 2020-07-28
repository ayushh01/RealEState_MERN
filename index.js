const express = require('express');
const http = require('http');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const nodemailer = require("nodemailer");
//importing routes
const PropertyRouter = require('./routes/PropertyRouter');
const HotelRouter = require('./routes/HotelRouter');
const UserRouter = require('./routes/UserRouter');
const uploadRouter = require('./routes/UploadRouter');
const commentRouter = require('./routes/CommentRouter');
const forcast = require('./routes/forcast');
const mailRouter = require('./routes/sendmail');
//authenticate
const authenticate=require('./authenticate');
const config = require('./config');

//port
const port = process.env.PORT || 3002;

/**************************************************************************************** */
//Database
const MongoURI = config.mongoURL;
const connect = mongoose.connect(MongoURI ,{ useNewUrlParser:true , useUnifiedTopology:true });

connect.then((db)=>{
    console.log(`Connected to Database`);
})
.catch((err)=>console.log(err));
/****************************************************************************************** */

const app = express();

//logger
app.use(logger('dev'));

//body-parser
app.use(bodyParser.json());

//cookie-parser
//app.use(cookieParser('12315-34233-32443-43222'));


//passport
app.use(passport.initialize());

//routes
app.use('/user',UserRouter);
app.use('/home',PropertyRouter);
app.use('/hotel',HotelRouter);
app.use('/imageupload', uploadRouter);
app.use('/comments',commentRouter);
app.use('/forcast',forcast);
app.use('/sendmail' ,mailRouter);

app.use(express.static(__dirname+'/public'));

app.use('/',(req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>This is Express Server</h1></body></html>');
});



//server
const server = http.createServer(app);

//port listen
server.listen(port,()=>{
    console.log(`Server is running at port:${port}`);
});