// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var commentFile = 'comment.json';
var commentData = require('./' + commentFile);
var port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/comment', function(req, res) {
  res.json(commentData);
});

app.post('/comment', function(req, res) {
  var newComment = {
    id: Date.now(),