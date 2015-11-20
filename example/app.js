var port = 3000;

var fs       = require('fs');
var express  = require('express');
var app      = express();

app.set( 'view engine', 'html' );
app.engine('.html',require('ejs').__express);

var mongoose = require('mongoose');

// http server global configuration
var http     = require('http');

var dburl = 'mongodb://localhost:27017/mydb';
var Schema = mongoose.Schema;

var db = mongoose.connect(dburl, function(err, response) {
  if (err) {
    console.error('Error in connecting to the required mongodb instance: ' + err.message);
  } else {
    console.log('Successfully connect to the required mongodb instance.');
  }
});

var userScheMa = new Schema({
    name: String,
    password: String
});

user = db.model('users', userScheMa)
//var user = db.model('Users', userScheMa);

app.get('/user', function(req, res) {
     user
        .find()
        .exec(function(err, users) {
            if (err) return res.status(500);
            return res.status(200).json({
                users: users
            });
        });
})
app.get('/', function(req, res) {
  return res.status(200).json('Hello World!!');
});

app.get('/steven', function(req, res) {
  return res.status(200).json('Welcome Steven!!');
})

http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log(http.globalAgent.maxSockets);
});
