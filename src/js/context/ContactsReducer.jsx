const initialState = {
    contacts: []
};

const ContactsReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_TASKS':
            return {
                ...state,
                contacts: Array.isArray(action.payload) ? action.payload : []
            };
        case 'ADD_CONTACT':
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            };
        case 'REMOVE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload.id)
            };
        case 'EDIT_CONTACT':
            return {
                ...state,
                contacts: state.contacts.map(contact =>
                    contact.id === action.payload.id ? action.payload : contact
                )
            };
        default:
            return state;
    }
};


export { initialState, ContactsReducer }
