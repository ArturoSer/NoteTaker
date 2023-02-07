const express = require("express");
const html = require("../jsRoute/html");
const api = require("../jsRoute/api");

const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", html)
app.use("/api", api)

app.listen(port, () =>
console.log(`App listening at http://localhost:${port}`)
);