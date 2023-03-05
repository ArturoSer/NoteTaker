const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
var storedNotes = require('./Develop/db/db.json');
const { Server } = require('http');
const { prototype } = require('events');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(storedNotes);
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} RECEIVED! adding new note!`);
    const { title, text } = req.body;
    if(title && text) {
        const newNote = {
            title, 
            text, 
            id: uuidv4(),
        };
        storedNotes.push(newNote);

        fs.writeFile(`./Develop/db/db.json`, JSON.stringify(storedNotes, null, 2), (err) =>
        err
        ? console.error(err)
        : console.log(`'${newNote.title} added to JSON file!`)
        );
        const response = {
            status: 'success',
            body: newNote, 
        };
        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json("ERROR unable to write note");
    }
});

app.delete('/api/notes/:id', (req, res) => {
    console.info(`${req.method} DELETED NOTE!`);
    const id = req.params.id;
    if(id) {
        storedNotes = storedNotes.filter((item) => item.id !== id);
        fs.writeFile(`./Develop/db/db.json`, JSON.stringify(storedNotes, null, 2), (err) =>
        err
        ? console.error(err)
        : console.log(`Note with id ${id} HAS BEEN DELETED!`)
        );
        const response = {
            status: 'success',
            id: id,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json("ERROR unable to delete note");
    }
});

app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, './public/index.html'))
);

app.listen(PORT, () => 
console.log(`App listening at http://localhost:${PORT}`)
);