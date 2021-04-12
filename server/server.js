const express = require("express");
const path = require("path");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
const url = require("url");
const User = require("./schema");

// app setup and variables
const app = express();
const baseDir = path.dirname(__dirname);
const port = 3000;

// DB connnection
const connectDB = async () => {
	await mongoose
		.connect(
			"mongodb+srv://magesh:mongo123@mycluster.rhps1.mongodb.net/bms_users?retryWrites=true&w=majority",
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		)
		.then((res) => {
			// Rendering the page at localhost and link for the localhost
			console.log("connected to the database");
			// printing every entry in the collection
			User.find((err, res) => {
				if (!err) {
					console.log(res);
				}
			});
		})
		.catch((err) => console.log(err));
};

// calling the async function
connectDB();

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
	// checking if the user already exists
	User.findOne({ username: body.username }, (err, result) => {
		if (!err && !result) {
			const user = new User(body);
			user
				.save()
				.then(() => {
					res.json(body);
				})
				.catch((err) => console.log(err));
		} else if (result) {
			res.json(null);
		}
	});
});
// handing login
app.post("/login", (req, res) => {
	let body = req.body;
	User.findOne(body, (err, result) => {
		if (!err) {
			res.json(result);
		}
	});
});
// 404 page rendering
// If none of the above is matched,  the 404 page is served.
app.use((req, res) => {
	res
		.status(404)
		.sendFile("/dist/404.html", { root: path.resolve(__dirname, "..") });
});
