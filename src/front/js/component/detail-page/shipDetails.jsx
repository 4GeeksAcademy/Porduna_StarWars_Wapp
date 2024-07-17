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
                            <h1 className="card-title text-dark">{store.currentVehicle.name}</h1>
                            <p className="card-text text-dark mt-3">Height: {store.currentVehicle.model}</p>
                            <p className="card-text text-dark">Class: {store.currentVehicle.vehicle_class}</p>
                            <p className="card-text text-dark">Manufacturer: {store.currentVehicle.manufacturer}</p>
                            <p className="card-text text-dark">Cost: {store.currentVehicle.cost_in_credits}</p>
                            <p className="card-text text-dark">Length: {store.currentVehicle.length}</p>
                            <p className="card-text text-dark">Passengers: {store.currentVehicle.passengers}</p>
                            <p className="card-text text-dark">Max Speed: {store.currentVehicle.max_atmosphering_speed}</p>
                        </div>
                    </div>
                </div>
            </div>
    )};