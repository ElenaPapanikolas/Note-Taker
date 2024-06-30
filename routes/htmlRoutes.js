const path = require('path');
const html = require('express').Router();
// Define a route to serve the notes.html file
html.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// Define a route to serve the index.html file for all other routes
html.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Exporting
module.exports = html;