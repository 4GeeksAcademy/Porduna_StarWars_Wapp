import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import  SWLogo  from "../../img/Star_Wars_Logo.png";
import "../../styles/navbar.css";


export const Navbar = () => {
    const { store, actions } = useContext(Context);

    const handleRemoveFavorite = (name) => {
        actions.removeFavorite(name);
    };

    return (
        <nav className="navbar navbar-expand-sm">
            <Link to="/">
                <div className="container-fluid">
                    <img src={SWLogo} alt="SW logo" className="mx-4" width="90" height="54" />
                </div>
            </Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse">
                <div className="navbar-nav me-auto mb-2 mb-sm-0">
                    <Link className="nav-link link-light" to="/characters">Characters</Link>
                    <Link className="nav-link link-light" to="/planets">Planets</Link>
                    <Link className="nav-link link-light" to="/ships">Ships</Link>
                    <Link className="nav-link link-light" to="/contacts">Contacts</Link>
                    {/* <a className="nav-link dropdown-toggle text-secondary" href="#" id="dropdown03" data-bs-toggle="dropdown" aria-expanded="false">Force sides</a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Jedis</a></li>
                        <li><a className="dropdown-item" href="#">Sith</a></li>
                        <li><a className="dropdown-item" href="#">Rebels</a></li>
                        <li><a className="dropdown-item" href="#">Empire</a></li>
                    </ul> */}
                </div>
                <div className="ml-auto me-right d-flex justify-content-between mb-2">
                <form role="search">
                    <input className="form-control" type="search" placeholder="A long time ago in a..." autocomplete="on" ></input>
                </form>
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Favorites {store.favorites.length}</button>
                    <ul className="dropdown-menu dropdown-menu-end bg-dark" aria-labelledby="dropdownMenuButton">
                    {store.favorites.length > 0 ? (
                        store.favorites.map((item, index) => (
                            <li key={index} className="dropdown-item text-warning">
                               {item.name} {item.type}
							   <span 
							   title="Delete"
							   style={{ cursor: "pointer" }}
							   onClick={() => handleRemoveFavorite(item.name)}>
                                <i className="fas fa-trash-alt text-danger mx-2"></i>
                                </span>
                            
                            </li>
                        ))
                    ) : (
                        <li className="dropdown-item">No favorites added</li>
                    )}
                    </ul>
                    <Link className="nav-link link-light px-1" to="/login">Login</Link>
                    <p className="Slash_Bar">/</p>
                    <Link className="nav-link link-light px-1" to="/signup">Signup</Link>
                </div>
            </div>
        </nav>
    );
};