require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const model = require("./model/patient");
const app = express();

mongoose.connect("mongodb://localhost:27017/hostipal");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
	res.header({ "Access-Control-Allow-Origin": "*" });
	next();
});

app.post("/api/patients", (req, res) => {
	const newPatient = new model({
		name: req.body.name,
		age: req.body.age,
		problem: req.body.problem,
	});

	newPatient.save(function (err, data) {
		if (err) {
			console.log(error);
		} else {
			res.json(data);
		}
	});
});

app.get("/api/patients", (req, res) => {
	model.find(function (err, data) {
		if (err) {
			console.log(err);
		} else {
			res.json(data);
		}
	});
});

app.delete("/api/patients/:id", function (req, res) {
	model.deleteOne({ _id: req.params.id }, function (err, data) {
		if (err) {
			console.log(err);
		} else {
			res.json(data);
		}
	});
});

app.get("/api/patients/:id", function (req, res) {
	model.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.name, age: req.body.age, problem: req.body.problem },
		function (err, data) {
			if (err) {
				console.log(err);
			} else {
				res.json(data);
			}
		}
	);
});

app.listen(process.env.PORT || 9000, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});
