import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/loginForm.css"

export const AddContacts = () => {
    const { actions } = useContext(Context)
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || !phone || !email || !address) {
        alert("Please fill out all fields.");
        return;
        }
        const dataToSend = {
        name: name,
        phone: phone,
        email: email,
        address: address
        }
        console.log("Data To Send: ", dataToSend);
        actions.addContact(dataToSend);
        navigate('/contacts')
    }
    const handleCancel = () => {
        setName('');
        setPhone('');
        setEmail('');
        setAddress('');
    }

    return (
        <div className="d-flex justify-content-center">
        // Add Contacts Form
            <div className="formLog">
                <h3 id="heading">Add Contact</h3>
                <div className="field text-end">
                    <label htmlFor="name" className="formLog-label2">Name</label>
                    <input type="name" id="textResized" className="formLog-control" placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)}/>
                </div>
                <div className="field row-2 text-end">
                    <label htmlFor="email" className="formLog-label2">Email</label>
                    <input type="email" id="textResized" className="formLog-control" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                </div>
                <div className="field row-2 text-end">
                    <label htmlFor="phone" className="formLog-label2">Phone</label>
                    <input type="phone" id="textResized" className="formLog-control" name="phone" placeholder="Enter phone" value={phone} onChange={(event) => setPhone(event.target.value)}/>
                </div>
                <div className="field row-2 text-end">
                    <label htmlFor="address" className="formLog-label2">Address</label>
                    <input type="address" id="textResized" className="formLog-control" placeholder="Enter address" autoComplete="off"
                    value={address} onChange={(event) => setAddress(event.target.value)}/>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="button1" onSubmit={handleSubmit}>&nbsp;&nbsp;Add Contact&nbsp;&nbsp;</button>
                    <button type="close" className="button1" onClick={handleCancel}>&nbsp;&nbsp;Close&nbsp;&nbsp;</button>
                </div>
            </div>
        </div>
    );
};
