import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/Contacts.css"

export const Contacts = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getContacts();
    }, []);

    const [newContact, setNewContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const [editContact, setEditContact] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewContact({ ...newContact, [name]: value });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditContact({ ...editContact, [name]: value });
    };

    const handleSaveContact = () => {
        actions.addContact(newContact);
        setNewContact({ name: "", email: "", phone: "", address: "" });
    };

    const handleUpdateContact = () => {
        actions.editContact(editContact);
        setEditContact(null);
    };

    return (
        <div className="container text-center">
            <h1>Contacts for slug: {store.agenda}</h1>

            <ul className="list-group col-4 mx-auto mt-4 ">
                {!store.contacts ? (
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    store.contacts.map((item, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center bg-black">
                            <strong className="text-white">{item.name}</strong>
                            <div className="ms-auto bg-black">
                                <span title="Edit" style={{ cursor: "pointer" }} className="fs-5 text-primary" onClick={() => setEditContact(item)}
                                    data-bs-toggle="modal" data-bs-target="#editContactModal">
                                    <i id="editInfo" className="fa-solid fa-pen-nib"></i>
                                </span>
                                <span title="Delete" style={{ cursor: "pointer" }} className="text-danger mx-3 fs-5"
                                    onClick={() => actions.deleteContact(item.id)}>
                                    <i id="deleteInfo" className="fa-regular fa-circle-xmark"></i>
                                </span>
                                <span title="Details" style={{ cursor: "pointer" }} className="text-success fs-5"
                                    data-bs-toggle="modal" data-bs-target={`#staticBackdrop-${index}`} >
                                    <i id="infoLogo" className="fa-solid fa-info"></i>
                                </span>
                            </div>
                            <div className="modal fade" id={`staticBackdrop-${index}`} data-bs-backdrop="static"
                                data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`staticBackdropLabel-${index}`}
                                aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id={`staticBackdropLabel-${index}`}>
                                                {item.name}
                                            </h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <p>Email: {item.email}</p>
                                            <p>Phone: {item.phone}</p>
                                            <p>Address: {item.address}</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                )}
            </ul>

            <button type="button" className="btn btn-dark mt-4" data-bs-toggle="modal" data-bs-target="#addContactModal">
            Add Contact
            </button>
            
            {/* Modal/Formulario para añadir contacto  */}
            <form onSubmit={handleChange}>
                <div className="modal fade" id="addContactModal" tabIndex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addContactModalLabel">Add New Contact</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="name"
                                            name="name" value={newContact.name} onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" name="email"
                                            value={newContact.email} onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Phone</label>
                                        <input type="text" className="form-control" id="phone" name="phone"
                                            value={newContact.phone} onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input type="text" className="form-control" id="address"
                                            name="address" value={newContact.address} onChange={handleChange}/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button type="button" className="btn btn-dark" onClick={handleSaveContact} data-bs-dismiss="modal">
                                    Add Contact
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/* Modal/Formulario para editar contacto  */}
            {editContact && (
                <div className="modal fade" id="editContactModal" tabIndex="-1"
                    aria-labelledby="editContactModalLabel" aria-hidden="true" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="editContactModalLabel">Edit Contact</h5>
                                <button type="button" className="btn-close"
                                    data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="name"
                                            name="name" value={editContact.name} onChange={handleEditChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" name="email"
                                            value={editContact.email} onChange={handleEditChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Phone</label>
                                        <input type="text" className="form-control" id="phone" name="phone"
                                            value={editContact.phone} onChange={handleEditChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input type="text" className="form-control" id="address" name="address"
                                            value={editContact.address} onChange={handleEditChange}/>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button type="button" className="btn btn-dark" onClick={handleUpdateContact} data-bs-dismiss="modal">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};