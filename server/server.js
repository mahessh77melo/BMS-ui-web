const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const url = require("url");

// app setup and variables
const app = express();
const baseDir = path.dirname(__dirname);
const port = 3000;

// listening to the port, starting the server
app.listen(port);
console.log(`Rendering the page at http://localhost:${port}`);

// middleware for static files
app.use(express.static(path.join(baseDir, "/dist")));

// middleware for comments on get and post requests in the console
app.use(morgan("dev"));

// form submission middleware code
app.use(express.urlencoded({ extended: true }));

// main page rendering
app.get("/", (req, res) => {
	res.sendFile("/dist/index.html", { root: path.resolve(__dirname, "..") });
});
