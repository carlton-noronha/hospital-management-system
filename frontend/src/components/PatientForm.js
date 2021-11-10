import React, { useState } from "react";
import { TextField, Grid, Button } from "@mui/material";
import { Save } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addContactAction } from "../actions/contact";
import axios from "axios";

const PatientForm = () => {
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [problem, setProblem] = useState("");

	const history = useHistory();
	const dispatch = useDispatch();

	const handleSubmit = () => {
		if (name && age && problem) {
			const patient = {
				name,
				age,
				problem,
			};

			axios
				.post("http://localhost:8089/api/patients", patient)
				.then((response) => {
					console.log(response.data);
					dispatch(addContactAction(patient));
					history.push("/");
				})
				.catch((err) => console.log(err));
		}
	};

	return (
		<form noValidate autoComplete="off" sx={{ p: 3 }}>
			<Grid container>
				<Grid item xs={12} md={6} sx={{ boxSizing: "border-box", p: 2 }}>
					<TextField
						variant="outlined"
						label="Full Name"
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
						sx={{ width: "100%" }}
					/>
				</Grid>
				<Grid item xs={12} md={6} sx={{ boxSizing: "border-box", p: 2 }}>
					<TextField
						variant="outlined"
						label="Age"
						required
						value={age}
						onChange={(e) => setAge(e.target.value)}
						sx={{ width: "100%" }}
					/>
				</Grid>
				<Grid item xs={12} sx={{ boxSizing: "border-box", p: 2 }}>
					<TextField
						variant="outlined"
						label="Problem"
						required
						value={problem}
						onChange={(e) => setProblem(e.target.value)}
						sx={{ width: "100%" }}
					/>
				</Grid>
				<Grid item xs={12} sx={{ boxSizing: "border-box", p: 2 }}>
					<Button
						color="primary"
						variant="contained"
						startIcon={<Save />}
						onClick={handleSubmit}
					>
						Save
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default PatientForm;
