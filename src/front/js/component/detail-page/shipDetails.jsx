import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";


export const ShipDetails = () => {

    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getCurrentVehicle();
    }, []);



    return (
        !store.currentVehicle ?
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            :
            <div className="card mb-3 mx-auto" style={{ maxWidth: "60rem" }}>

                <div className="row g-0 ">
                    <div className="col-md-4" >
                        <img 
                        style={{ height: "375px" }}
                        src={`https://starwars-visualguide.com/assets/img/vehicles/${store.currentVehicle.uid}.jpg`} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h1 className="card-title text-dark">{store.currentVehicle.properties.name}</h1>
                            <p className="card-text text-dark mt-3">Height: {store.currentVehicle.properties.model}</p>
                            <p className="card-text text-dark">Class: {store.currentVehicle.properties.vehicle_class}</p>
                            <p className="card-text text-dark">Manufacturer: {store.currentVehicle.properties.manufacturer}</p>
                            <p className="card-text text-dark">Cost: {store.currentVehicle.properties.cost_in_credits}</p>
                            <p className="card-text text-dark">Length: {store.currentVehicle.properties.length}</p>
                            <p className="card-text text-dark">Passengers: {store.currentVehicle.properties.passengers}</p>
                            <p className="card-text text-dark">Max Speed: {store.currentVehicle.properties.max_atmosphering_speed}</p>
                        </div>
                    </div>
                </div>
            </div>
    )};