// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Read comments from comments.json
var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

// Serve static files
app.use(express.static('public'));

// Use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get comments
app.get('/api/comments', function(req, res) {
  res.json(comments);
});

// Add comment
app.post('/api/comments', function(req, res) {
  var comment = {
    id: Date.now(),
    text: req.body.text // Ensure the comment text is taken from the request body
  };
  comments.push(comment); // Add the new comment to the comments array
  res.status(201).json(comment); // Respond with the newly created comment
});
