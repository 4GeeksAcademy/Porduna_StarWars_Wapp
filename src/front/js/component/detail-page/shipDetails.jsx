import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams } from 'react-router-dom';


export const ShipDetails = () => {

    const { store, actions } = useContext(Context);
    const params = useParams();
    const [vehicleUno, setVehicleUno] = useState({});
    const [vehicleImage, setVehicleImage] = useState("");

    useEffect(() => {
        if (store.Vehicles && store.Vehicles[params.vehicle]) {
            fetchVehicleData();
        }
    }, [store.Vehicles, params.vehicle]);

    const fetchVehicleData = () => {
        fetch(`https://www.swapi.tech/api/starships/${params.vehicle}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setVehicleUno(data.result.properties);
                const vehicleImage = `https://starwars-visualguide.com/assets/img/starships/${parseInt(params.vehicle) + 6}.jpg`;
                setVehicleImage(vehicleImage);
            })
            .catch((error) => {
                console.error('Error fetching vehicle:', error);
            });
    };

    if (!store.Vehicles || !store.Vehicles[params.vehicle]) {
        return <div>Loading...</div>;
    }

    const vehicle = store.Vehicles[params.vehicle];

    return (
        !store.Vehicles ?
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            :
            <div className="card mb-3 mx-auto" style={{ maxWidth: "50rem" }}>

                <div className="row g-0 ">
                    <div className="col-md-4">
                        <img src={vehicleImage} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h1 className="card-title text-dark">{vehicle.name}</h1>
                            <p className="card-text text-dark mt-3">Height: {vehicle.model}</p>
                            <p className="card-text text-dark">Class: {vehicle.vehicle_class}</p>
                            <p className="card-text text-dark">Manufacturer: {vehicle.manufacturer}</p>
                            <p className="card-text text-dark">Cost: {vehicle.cost_in_credits}</p>
                            <p className="card-text text-dark">Length: {vehicle.length}</p>
                            <p className="card-text text-dark">Passengers: {vehicle.passengers}</p>
                            <p className="card-text text-dark">Max Speed: {vehicle.max_atmosphering_speed}</p>
                        </div>
                    </div>
                </div>
            </div>
    )};