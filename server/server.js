const express = require("express");
const path = require("path");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
const open = require("open");
const { userSchema } = require("./schema");
const { valuesSchema } = require("./schema");

// app setup and variables
const app = express();
const baseDir = path.dirname(__dirname);
const port = process.env.PORT;

// creating two seperate connections
const conn = new mongoose.Mongoose();
const conn2 = new mongoose.Mongoose();
/**
 * Async function that establishes the connection between the given mongoose instance and the uri string. After the process is finished successfully, it prints "Connected to {dbName} DB".
 * @param {Mongoose} connection
 * @param {String} urlString
 * @param {String} dbName
 */
const establishConnection = async function (connection, urlString, dbName) {
	await connection
		.connect(urlString, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then((res) => {
			console.log(`Connected to ${dbName} DB`);
		})
		.catch((err) => console.log(err));
};
establishConnection(conn, process.env.BMS_USERS_ATLAS_URL, "users");
establishConnection(conn2, process.env.BMS_VALUES_ATLAS_URL, "values");

/**
 * Utility function for development purposes. Used to print all the documents in the given collection.
 * @param {Mongoose.model} model
 */
const printAllDocs = function (model) {
	model.find((err, res) => {
		if (!err) {
			console.log(res);
		}
	});
};

// stored in users database
const User = conn.model("user", userSchema);
// printAllDocs(User);

// stored in values database
const Value = conn2.model("All", valuesSchema, "All");
// printAllDocs(Value);

// listening to the port, starting the server
app.listen(port);
console.log(`Rendering the page at http://localhost:${port}`);

// automatically opens the page in the default browser
open(`http://localhost:${port}`);

// middleware for static files
app.use(express.static(path.join(baseDir, "/build")));

// middleware for comments on get and post requests in the console
app.use(morgan("dev"));

// form submission middleware code
app.use(express.urlencoded({ extended: true }));

// middleware for handling json post requests
app.use(express.json());

// main page rendering
app.get("/", (req, res) => {
	res.sendFile("/build/index.html", { root: path.resolve(__dirname, "..") });
});

// handling register
app.post("/register", (req, res) => {
	let body = req.body;
	// checking if the user already exists
	User.findOne({ username: body.username }, (err, result) => {
		// proceed only if there is no result returned from findOne
		if (!err && !result) {
			const user = new User(body);
			user
				.save()
				.then(() => {
					res.json(body);
				})
				.catch((err) => console.log(err));
		} else if (result) {
			// return null if the user already exists, further dealt in the frontend
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

// handling get request for values
app.get("/values", (req, res) => {
	Value.findOne({ currentCharge: 72 }, (err, result) => {
		if (!err) {
			res.json(result);
		} else {
			res.json(null);
		}
	});
});

// 404 page rendering
// If none of the above is matched,  the 404 page is served.
app.use((req, res) => {
	res
		.status(404)
		.sendFile("/build/404.html", { root: path.resolve(__dirname, "..") });
});
