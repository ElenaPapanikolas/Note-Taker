const express = require('express');
const fs = require('fs');
const path = require('path');

const api = express();

api.use(express.json()); // Middleware to parse JSON body

// Define a route to read the db.json file and return all saved notes as JSON
api.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

// Define a route to receive a new note, add it to db.json, and return the new note
api.post('/api/notes', (req, res) => {
    const newNote = req.body;
    /////////////// // Generate a unique ID for the new note

    fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const notes = JSON.parse(data);
        notes.push(newNote);

        fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(notes, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.json(newNote);
        });
    });
});

// Exporting
module.exports = api;