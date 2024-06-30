const express = require('express');
const fs = require('fs');
const path = require('path');
// npm package to generate unique ids for each note
const { v4: uuidv4 } = require('uuid');
const api = express();

// Define a route to read the db.json file and return all saved notes as JSON
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

// Define a route to receive a new note, add it to db.json, and return the new note
api.post('/notes', (req, res) => {
    const newNote = req.body;
    // Generate a unique ID for the new note
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

// Delete request to delete notes
api.delete('/notes/:id', (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const notes = JSON.parse(data);
            const { id } = req.params;
            const index = notes.findIndex(note => note.id ===id);

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


// Exporting
module.exports = api;