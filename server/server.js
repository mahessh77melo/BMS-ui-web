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
app.use(express.json());

// main page rendering
app.get("/", (req, res) => {
	res.sendFile("/dist/index.html", { root: path.resolve(__dirname, "..") });
});

// handling register
app.post("/register", (req, res) => {
	let body = req.body;
	console.log(body);
	res.json(body);
});
// handing login
app.post("/login", (req, res) => {
	let body = req.body;
	console.log(body);
	res.json(body);
});
// 404 page rendering
// If none of the above is matched,  the 404 page is served.
app.use((req, res) => {
	res
		.status(404)
		.sendFile("/dist/404.html", { root: path.resolve(__dirname, "..") });
});
