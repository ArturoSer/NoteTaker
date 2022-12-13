const {
    readAndAppend, 
    writeToFile,
    readFromFile,
} = require("../utilsJS/utilsfs");
const db = require("../Develop/db/db.json");
const path = require("path");
const uuid = require("../utilsJS/random");
const router = require("express").Router();

router.get("/notes", (req, res) => {
    const dbPath = path.join(__dirname, "../develop/db/db.json");
    readFromFile(dbPath)
    .then((data) => {
        return res.json(JSON.parse(data));
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

router.post("/notes", (req, res) => {
    const dbPath = path.join(__dirname, "../develop/db/db.json");
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title, 
            text,
            id: uuid(),
        };
        readAndAppend(newNote, dbPath);
        const response = {
            status: "success",
            body: newNote,
        };
        res.json(response);
    } else {
        res.json("Error!");
    }
});

router.delete("/notes/:id", (req, res) => {
    const dbPath = path.join(__dirname, "../develop/db/db.json");
    const id = req.params.id;
    readFromFile(dbPath)
    .then((notes) => {
        var parseNotes = JSON.parse(notes)
        const notesARRAY = parse.parseNotes.filter((note) => note.id !== id);
        writeToFile(dbPath, notesARRAY);
    })
    .then(() => {
        res.json(`Item ${id} has been deleted!`)
    }).catch((err) => {
        res.status(500).json(err);
    })
});
module.exports = router;