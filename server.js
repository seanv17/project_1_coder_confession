// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
var app = express();

// bodyParser require
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));


var controllers = require('./controllers');

// require models to get access
var db = require('./models');

/**********
 * ROUTES *
 **********/



/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
