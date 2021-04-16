const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// defining the structure of the database
const userSchema = new Schema(
	{
		carNumber: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);
const valuesSchema = new Schema({
	currentCharge: Number,
	temprature: Number,
	energy: Number,
	maxcurrentenergy: Number,
	maxdesignenergy: Number,
	voltage: Number,
	timetoShutdown: String,
});

module.exports = { valuesSchema, userSchema };
