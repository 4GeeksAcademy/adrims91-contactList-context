import React, { useContext, useState, useEffect } from "react";
import { ContactsContext } from "../context/ContactsContext.jsx";
import ContactModal from "./ContactModal.jsx";
import EditContact from "./EditContact.jsx";
import { Link } from "react-router-dom";

const ContactList = () => {
  const { state, fetchContacts, removeContact } = useContext(ContactsContext);
  const [showModal, setShowModal] = useState(false);
  const [editingContactId, setEditingContactId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
      <div>
        {!showModal && !editingContactId ? (
          <div className="d-flex justify-content-evenly mt-2">
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-success"
            >
              Add New Contact
            </button>
            <Link to={"/"}>
              <button className="btn btn-danger">Home</button>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
      {showModal ? (
        <div
          style={{ display: "block" }}
          className="modal fade show"
          tabIndex="-2"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Contact</h5>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <ContactModal onClose={() => setShowModal(false)} />
              </div>
            </div>
          </div>
        </div>
      ) : editingContactId ? (
        <div
          style={{ display: "block" }}
          className="modal fade show"
          tabIndex="-2"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Contact</h5>
                <button
                  onClick={() => setEditingContactId(null)}
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <EditContact
                  contactId={editingContactId}
                  onClose={() => setEditingContactId(null)}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ul className="d-flex flex-column m-2">
          {state.contacts.map((contact, index) => (
            <li className="list-group-item m-2" key={index}>
              <div className="card mb-3" style={{ maxWidth: "540px" }}>
                <p
                  onClick={() => removeContact(contact.id)}
                  className="d-flex justify-content-end pe-2"
                >
                  {" "}
                  X{" "}
                </p>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src="https://img.freepik.com/vector-premium/hombre-sentado_631382-43.jpg"
                      className="card-img-top"
                      alt="Should be an image"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <ul className="list-group list-group-">
                        <li className="list-group-item">{contact.name}</li>
                        <li className="list-group-item">
                          <i className="fa-regular fa-envelope me-2"></i>{" "}
                          {contact.email}
                        </li>
                        <li className="list-group-item">
                          <i className="fa-solid fa-phone me-2"></i>{" "}
                          {contact.phone}
                        </li>
                        <li className="list-group-item">
                          <i className="fa-solid fa-location-dot me-2"></i>{" "}
                          {contact.address}
                        </li>{" "}
                      </ul>
                    </div>
                  </div>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setEditingContactId(contact.id)}
                  >
                    {" "}
                    Edit Card{" "}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
