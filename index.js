const express = require('express');
const http = require('http');
const logger = require('morgan');

//port
const port = process.env.PORT || 5000;

const app = express();

//logger
app.use(logger('dev'));

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