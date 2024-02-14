// Create web server with express, and handle requests with comments.js
// Comments.js will fetch the comments from the database and return them as a JSON object
// Comments.js will also handle adding new comments to the database
// This file is a module
// It exports a function that takes the database as an argument and returns an express app

module.exports = function(db) {
    var express = require('express');
    var comments = express.Router();
    var bodyParser = require('body-parser');
    comments.use(bodyParser.json());

    // Fetch all comments
    comments.get('/', function(req, res) {
        db.all('SELECT * FROM comments', function(err, rows) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(rows);
            }
        });
    });

    // Add a new comment
    comments.post('/', function(req, res) {
        var name = req.body.name;
        var comment = req.body.comment;
        if (name && comment) {
            db.run('INSERT INTO comments (name, comment) VALUES (?, ?)', [name, comment], function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(201).send('Comment added');
                }
            });
        } else {
            res.status(400).send('Missing name or comment');
        }
    });

    return comments;
};