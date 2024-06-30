// Imports Node path
const path = require('path');
// Imports Express Router class
const html = require('express').Router();

// Defines a route to serve the notes.html file
html.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// Defines a route to serve the index.html file for all other routes
html.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Exporting html object
module.exports = html;