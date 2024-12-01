import React, { useContext, useState, useEffect } from "react";
import { ContactsContext } from "../context/ContactsContext.jsx";

const EditContact = ({ contactId, onClose }) => {
  const { state, editContact } = useContext(ContactsContext);
  const [contact, setContact] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const foundContact = state.contacts.find(
      (contact) => contact.id === contactId
    );
    if (foundContact) {
      setContact(foundContact);
      setName(foundContact.name);
      setPhone(foundContact.phone);
      setEmail(foundContact.email);
      setAddress(foundContact.address);
    } else {
      console.error("Contact not found");
    }
  }, [contactId, state.contacts]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedContact = { id: contactId, name, phone, email, address };
    try {
      await editContact(updatedContact);
      onClose();
    } catch (error) {
      console.error("Error updating contact", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="inputName" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="inputName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="inputPhone" className="form-label">
          Phone
        </label>
        <input
          type="text"
          className="form-control"
          id="inputPhone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="inputEmail" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="inputEmail"
          aria-describedby="emailHelp"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="inputAddress" className="form-label">
          Address
        </label>
        <input
          type="text"
          className="form-control"
          id="inputAddress"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default EditContact;
