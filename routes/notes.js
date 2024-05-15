const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const notes = express.Router();
const jsonPath = path.join(__dirname, '../db/db.json');

// API Routes
notes.get('/api/notes', (req, res) => {
    fs.readFile(jsonPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading notes');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

notes.post('/api/notes', (req, res) => {
    const newNote = {...req.body, id: uuidv4()};

    fs.readFile(jsonPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading notes');
        } else {
            const notes = JSON.parse(data);
            notes.push(newNote);

            fs.writeFile(jsonPath, JSON.stringify(notes, null, 4), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error saving note');
                } else {
                    res.json(newNote);
                }
            });
        }
    });
});

  notes.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;

    fs.readFile(jsonPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading notes');
        } else {
            let notes = JSON.parse(data);
            const updatedNotes = notes.filter(note => note.id !== noteId);

            fs.writeFile(jsonPath, JSON.stringify(updatedNotes, null, 4), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error saving notes');
                } else {
                    res.json(`Note ${noteId} has been deleted`);
                }
            });
        }
    });
});

module.exports = notes;
