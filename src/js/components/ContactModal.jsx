import React, { useState, useContext } from "react";
import { ContactsContext } from "../context/ContactsContext.jsx";

const ContactModal = ( {onClose} ) => {
  const { addContact } = useContext(ContactsContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newContact = {
      name,
      phone,
      email,
      address,
    };
    try {
      await addContact(newContact);
      setName("");
      setPhone("");
      setEmail("");
      setAddress("");
      onClose();
    } catch (error) {
      console.error("Error adding new contact", error);
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

export default ContactModal;
