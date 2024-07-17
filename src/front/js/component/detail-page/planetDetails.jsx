import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";


export const PlanetDetails = () => {

    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getCurrentPlanet();
    }, []);



    return (
        !store.currentPlanet ?
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            :
            <div className="card mb-3 mx-auto" style={{ maxWidth: "60rem" }}>

                <div className="row g-0 ">
                    <div className="col-md-4" >
                        <img 
                        style={{ height: "375px" }}
                        src={`https://starwars-visualguide.com/assets/img/vehicles/${store.currentPlanet.uid}.jpg`} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                        <h1 className="card-title text-dark">{store.currentPlanet.name}</h1>
                            <p className="card-text text-dark mt-3">Diameter: {store.currentPlanet.height}</p>
                            <p className="card-text text-dark">Population: {store.currentPlanet.gender}</p>
                            <p className="card-text text-dark">Climate: {store.currentPlanet.birth_year}</p>
                            <p className="card-text text-dark">Terrain: {store.currentPlanet.mass}</p>
                            <p className="card-text text-dark">Orbital Period: {store.currentPlanet.hair_color}</p>
                            <p className="card-text text-dark">Rotation Period: {store.currentPlanet.skin_color}</p>
                        </div>
                    </div>
                </div>
            </div>
    )};