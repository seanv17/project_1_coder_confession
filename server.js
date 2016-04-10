// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
var app = express();

// bodyParser require
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// require controllers to get access
var controllers = require('./controllers');

// require models to get access
var db = require('./models');

/*
 * HTML Endpoints
 */

//localhost:300
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/admin', function homepage (req, res) {
  res.sendFile(__dirname + '/views/admin.html');
});

/*
 * JSON API Endpoints
 */

 // Alias endpoints
 app.get('/api', controllers.api.index);
 app.get('/api/aliases', controllers.aliases.index);
 app.post('/api/aliases', controllers.aliases.create);
 app.delete('/api/aliases/:aliasId/', controllers.aliases.destroy);

 // Confession endpoints
 app.put('/api/aliases/:aliasId/confessions/submission/:submissionId', controllers.confessions.update);
 app.delete('/api/aliases/:aliasId/confessions/submission/:submissionId', controllers.confessions.destroy);

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
