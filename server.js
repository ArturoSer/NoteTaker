const express = require("express");
const htmlRoute = require("./jsRoute/html");
const apiRoute = require("./jsRoute/api");

const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(expres.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", htmlRoute)
app.use("/api", apiRoute)

app.listen(port, () =>
console.log(`App listening at http://localhost:${port}`)
;)