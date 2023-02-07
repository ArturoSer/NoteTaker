const path = require("path")
const router = require("express").Router()

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "./index.html"))
});

router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "./notes.html"))
});
module.exports = router;