const contactsReducer = (state = [], action) => {
	switch (action.type) {
		case "ADD_CONTACT":
			return [...state, action.contact];
		case "ADD_CONTACTS":
			return action.contacts;
		default:
			return state;
	}
};

export default contactsReducer;
