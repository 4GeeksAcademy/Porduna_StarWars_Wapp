import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";


export const PlanetDetails = () => {
    const {store, actions} = useContext(Context);
    const params = useParams();
    useEffect(() => {
        actions.getCurrentPlanet()
    }, []);
    console.log('Params planetid', params.planetid);
    console.log('Store planet', store.planet);

    return (
        <div className="row justify-content-center">
            <div className="col-6">
                <div className="card">
                    <div className="card-header">
                        <strong>Planet name:</strong> {store.planets[params.planetid].name}
                    </div>
                    <div className="card-body">
                        <p className="card-text">Rotation period: {store.planets[params.planetid].rotation_period}</p>
                        <p className="card-text">Orbital Period: {store.planets[params.planetid].orbital_period}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};