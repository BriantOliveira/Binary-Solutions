/*******************************************
 *  Binary Software Solutions
 *  Server
 ******************************************/

const nodemon = require('nodemon');
const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');


//Instantiate express
const app = express();

//Defining Port
const PORT = process.env.PORT || 8000


/****************************************************
 *  Add Middleware
 ***************************************************/
 app.set('views', path.join(__dirname, 'views'));
 app.use(bodyParser.urlencoded({extended: true}));
 app.use(express.static('./public'));
 //Handlebars view engine setup
 app.engine('hbs', hbs({defaultLayout: 'index', extname: 'hbs'}));
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
