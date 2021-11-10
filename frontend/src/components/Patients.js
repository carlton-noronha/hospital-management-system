import React from "react";
import {
	Card,
	CardActionArea,
	CardContent,
	Typography,
	CardActions,
	Button,
} from "@mui/material";
import { addContactsAction } from "../actions/contact";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Patients = ({ contact }) => {
	const contacts = useSelector((state) => state.contacts);
	const dispatch = useDispatch();

	const handleDelete = (e) => {
		const newContacts = contacts.filter(
			(contact) => contact["_id"] !== e.target.name
		);

		const id = contacts.find((contact) => contact["_id"] === e.target.name)[
			"_id"
		];

		axios
			.delete("http://localhost:8080/api/patients/:id")
			.then((response) => dispatch(addContactsAction(newContacts)))
			.catch((err) => console.log(err));
	};

	return (
		<Card>
			<CardActionArea>
				<CardContent>
					<Typography variant="body2" noWrap={true} component="div">
						<span style={{ fontWeight: "bold" }}>Name:</span>{" "}
						{`${contact.name}`}
					</Typography>
					<Typography variant="body2" noWrap={true} component="div">
						<span style={{ fontWeight: "bold" }}>Age:</span> {contact.age}
					</Typography>
					<Typography variant="body2" noWrap={true} component="div">
						<span style={{ fontWeight: "bold" }}>Problem:</span>{" "}
						{contact.problem}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button
					size="small"
					name={contact["_id"]}
					color="primary"
					onClick={handleDelete}
				>
					Delete
				</Button>
			</CardActions>
		</Card>
	);
};

export default Patients;
