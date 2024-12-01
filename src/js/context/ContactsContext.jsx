import React, { createContext, useReducer } from 'react';
import { ContactsReducer, initialState } from '../context/ContactsReducer.jsx'

const ContactsContext = createContext();

const ContactsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ContactsReducer, initialState);


  const createAgenda = async () => {
    try{
      await fetch('https://playground.4geeks.com/contact/agendas/ambrosio', {
        method: 'POST'
      })
    }catch(error){
      console.error('Error creating Agenda.')
    }
  }
  
  const fetchContacts = async () => {
    try{
      const response = await fetch('https://playground.4geeks.com/contact/agendas/ambrosio')
        if (!response.ok){
          createAgenda()
      }else {
          const data = await response.json()
          dispatch({ type: 'FETCH_TASKS', payload: data.contacts })
      }
    }catch(error) {
      console.error('Error fetching tasks', error)
    }
  }


  const addContact = async (contact) => {
    try{
       const response = await fetch('https://playground.4geeks.com/contact/agendas/ambrosio/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
      })
      if (response.ok){
        const data = await response.json()
        dispatch({type: 'ADD_CONTACT', payload: data})
      }
    }catch(error){
      console.error('Error adding a new contact.')
    }
  }

  const removeContact = async (id) => {
    try {
        const answer = prompt('Do you want to remove this contact?');
        if (answer && answer.trim().toLowerCase() === 'yes') {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/ambrosio/contacts/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                dispatch({ type: 'REMOVE_CONTACT', payload: id });
                fetchContacts();
            } else {
                console.error('Could not remove the contact');
            }
        } else {
            console.log('Contact was not removed');
        }
    } catch (error) {
        console.error('Error deleting contact', error);
    }
};


  const editContact = async (updatedContact) => {
    try {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/ambrosio/contacts/${updatedContact.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedContact)
        });
        if (response.ok) {
            const data = await response.json();
            dispatch({ type: 'EDIT_CONTACT', payload: data });
        } else {
            console.error('Failed to update contact, status:', response.status);
        }
    } catch (error) {
        console.error('Error editing contact', error);
    }
};




  return (
    <ContactsContext.Provider value={{ state, dispatch, fetchContacts, addContact, removeContact, editContact }}>
      {children}
    </ContactsContext.Provider>
  );
};

export { ContactsContext, ContactsProvider };
