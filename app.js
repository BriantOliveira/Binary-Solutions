/*******************************************
 *  Binary Software Solutions
 *  Server
 ******************************************/

const nodemon = require('nodemon');
const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');



//Instantiate express
const app = express();

//Defining Port
const PORT = process.env.PORT || 8000

//Connecting the database
// mongoose.Promise = global.Promise;
//
// mongoose.connect('mongodb://localhost/binary', {useMongoClient: true});
// console.log("You are connected to the database...");
//
//
//
// let db = mongoose.connection;
//
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//
// });


/****************************************************
 *  Add Middleware
 ***************************************************/
 app.set('main', path.join(__dirname, 'main'));
 app.use(bodyParser.json());
 app.use(cookieParser());
 app.use(bodyParser.urlencoded({extended: true}));
 app.use(express.static('./public'));
 //Handlebars view engine setup
 app.engine('hbs', hbs({defaultLayout: 'main', extname: 'hbs'}));
 app.set('view engine', 'hbs');


 //Add 404 error handler
 app.use(function (req,  res, next) {
     var err = new Error('Page Not Found');
     err.status = 404;
     next(err);
 });

 //Redirect to 404 page
 app.use(function(err, req, res, next) {
     if (err.status == 404) {
         //res.redirect('/404.html');
         res.send('Error!!! Page not found...')
     };
 });

 //Load Routes
 require('./routes/router.js')(app);

 //Listen on port number
 app.listen(PORT, function() {
     console.log('Binary Software Solutions listening on port', PORT);
 })
