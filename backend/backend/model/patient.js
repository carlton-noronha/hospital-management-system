const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
	{
		name: { type: String },
		age: { type: String },
		problem: { type: String },
	},
	{ collection: "patients" }
);

const model = mongoose.model("patientModel", patientSchema);

module.exports = model;
