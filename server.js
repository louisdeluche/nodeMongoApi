const express = require('express');
const logger = require('morgan');
const posts = require('./routes/posts') ;
const users = require('./routes/users');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //database configuration
var jwt = require('jsonwebtoken');
const app = express();
app.set('secretKey', 'nodeRestApi'); // jwt secret token
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(express.json())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function(req, res){
    res.json({"tutorial" : "Build REST API with node.js"});
});
// public route
app.use('/users', users);
// private route
// app.use('/posts', validateUser, posts);
app.use('/posts', posts);
app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});
// function validateUser(req, res, next) {
//     jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
//         if (err) {
//             res.json({status:"error", message: err.message, data:null});
//         }else{
//             // add user id to request
//             req.body.userId = decoded.id;
//             next();
//         }
//     });
//
// }


// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// handle errors
app.use(function(err, req, res, next) {
    console.log(err);

    if(err.status === 404)
        res.status(404).json({message: "Not found"});
    else
        res.status(500).json({message: "Something looks wrong :( !!!"});
});
app.listen(3001, function(){
    console.log('Node server listening on port 3001');
});