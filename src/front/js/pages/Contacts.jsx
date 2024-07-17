import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import OutOfOrder from "../../img/Out-of-order.png";
import "../../styles/Contacts.css"

export const Contacts = () => {
    const { store, actions } = useContext(Context);
    const handleDelete = (contactId) => {
        actions.removeContact(contactId);
        console.log("Remove Id: ", contactId); 
    }
    const handlecurrentUser = (item) => {
    actions.setcurrentUser(item)
    console.log("Current Force Holder: ", item); 
    }
    return (
        <div className="container justify-content-center col-6">

            <h1 className="text-black text-center">Force Contacts</h1>
            <h1 id="book" className="text text-center"><i className="fa-solid fa-book-journal-whills"></i></h1>
            <div className="text-center mb-3"> 
                <Link to='/addContacts' className="button3">Join The force</Link>
            </div>
            <h4 className="text-center text-white">Milicrodians' holders</h4>
            <div className="list-group">
                {store.contacts.length === 0 ?
                    <img src={OutOfOrder} alt="No Force Holders" className="img-fluid" id="outOfServiceLogo"/> :
                    <>
                        {store.contacts.map((item, index) =>
                            <div className="d-flex justify-content-between align-items-center list-group-item list-group-item-action" key={index}>
                                <span>{item.name}</span>
                                <Link to="/editContacts" className="ms-auto ">
                                <i onClick={() => handlecurrentUser(item)} className="fas fa-edit me-2"></i>
                                </Link>
                                <i className="text-danger fas fa-trash" onClick={()=>handleDelete(item.id)}></i>
                            </div>
                        )}
                    </>
                }
            </div>
        </div>
    )
}