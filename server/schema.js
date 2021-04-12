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

const User = mongoose.model("user", userSchema);
module.exports = User;
