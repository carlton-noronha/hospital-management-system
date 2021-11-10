export const addContactAction = (contact) => {
	return {
		type: "ADD_CONTACT",
		contact,
	};
};

export const addContactsAction = (contacts) => {
	return {
		type: "ADD_CONTACTS",
		contacts,
	};
};
