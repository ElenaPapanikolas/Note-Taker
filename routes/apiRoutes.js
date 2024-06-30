// Imports Express
const express = require('express');
// Imports Node fs modules
const fs = require('fs');
// Imports Node path
const path = require('path');
// Imports npm package, with specific version, to generate unique ids for each note
const { v4: uuidv4 } = require('uuid');

// Initializes Express 
const api = express();

// Defines a GET route to read the db.json file and return all saved notes as JSON
api.get('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

// Defines a POST route to receive a new note, add it to db.json, and return the new note
api.post('/notes', (req, res) => {
    const newNote = req.body;
    // Generates a unique ID for the new note
    newNote.id = uuidv4();
    

    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const notes = JSON.parse(data);
        notes.push(newNote);

        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.json(newNote);
        });
    });
});

// Defines a DELETE route to delete notes
api.delete('/notes/:id', (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Parses notes data into JavaScript object
            const notes = JSON.parse(data);
            // Extracts id parameter from request URL
            const { id } = req.params;
            // Finds index of note with provided id
            const index = notes.findIndex(note => note.id ===id);

            // If index is found, removes note from notes array in db.json
            if (index !== -1) {
                notes.splice(index, 1);
                fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 2), (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }
                });
                    res.status(204).json(notes);
                } else {
                    res.status(404).json({error: 'No note found'});
                }
        } 
    });
    
});


// Exporting api object
module.exports = api;