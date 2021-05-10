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
	armatureCurrent: Number,
	fieldCurrent: Number,
	speed: Number,
	torque: Number,
	SOC: Number,
	batteryCurrent: Number,
	batteryVoltage: Number,
});

module.exports = { valuesSchema, userSchema };
