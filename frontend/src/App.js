import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { addContactsAction } from "./actions/contact";
import axios from "axios";

function App() {
	const contacts = useSelector((state) => state.contacts);
	const dispatch = useDispatch();

	useEffect(() => {
		axios
			.get("http://localhost:8080/api/patients")
			.then((response) => dispatch(addContactsAction(response.data)))
			.catch((err) => console.log(err));
	}, []);

	return (
		<BrowserRouter>
			<Layout contacts={contacts} />
		</BrowserRouter>
	);
}

export default App;
