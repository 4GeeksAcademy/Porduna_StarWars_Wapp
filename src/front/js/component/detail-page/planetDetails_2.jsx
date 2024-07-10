import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";


export const PlanetDetails = () => {

    const { store, actions } = useContext(Context);
    const params= useParams();

    useEffect(() => {
        actions.getCurrentPlanet();
    }, []);
console.log (store.currentPlanet)

    return (
        !store.currentPlanet ?
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            :
            <div className="card mb-3 mx-auto" style={{ maxWidth: "60rem" }}>

                <div className="row g-0 ">
                    {/* <div className="col-md-4">
                        <img src={`https://starwars-visualguide.com/assets/img/planets/${store.currentPlanet.uid}.jpg`} className="img-fluid rounded-start" alt={`Image of planet ${store.currentPlanet.name}`}/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h1 className="card-title text-dark">{store.currentPlanet[params.planetid].name}</h1> */}
                            {/* <p className="card-text text-dark mt-3">Diameter: {store.currentPlanet.properties.diameter}</p>
                            <p className="card-text text-dark">Population: {store.currentPlanet.properties.population}</p>
                            <p className="card-text text-dark">Climate: {store.currentPlanet.properties.climate}</p>
                            <p className="card-text text-dark">Terrain: {store.currentPlanet.properties.terrain}</p>
                            <p className="card-text text-dark">Orbital Period: {store.currentPlanet.properties.orbital_period}</p>
                            <p className="card-text text-dark">Rotation Period: {store.currentPlanet.properties.rotation_period}</p> */}
                        {/* </div> */}
                    {/* </div> */}
                </div>
            </div>
    );
}


import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";



export const CharacterDetails = () => {

    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getcurrentPlanet();
    }, []);

    return (
        !store.currentPlanet ?
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            :
            <div className="card mb-3 mx-auto" style={{ maxWidth: "50rem" }}>

                <div className="row g-0 ">
                    <div className="col-md-4">
                        <img src={`https://starwars-visualguide.com/assets/img/characters/${store.currentPlanet.uid}.jpg`} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h1 className="card-title text-dark">{store.currentPlanet.properties.name}</h1>
                            <p className="card-text text-dark mt-3">Diameter: {store.currentPlanet.properties.height}</p>
                            <p className="card-text text-dark">Population: {store.currentPlanet.properties.gender}</p>
                            <p className="card-text text-dark">Climate: {store.currentPlanet.properties.birth_year}</p>
                            <p className="card-text text-dark">Terrain: {store.currentPlanet.properties.mass}</p>
                            <p className="card-text text-dark">Orbital Period: {store.currentPlanet.properties.hair_color}</p>
                            <p className="card-text text-dark">Rotation Period: {store.currentPlanet.properties.skin_color}</p>
                        </div>
                    </div>
                </div>
            </div>
    )};




    <div className="card mb-3 mx-auto" style={{ maxWidth: "60rem" }}>

        <div className="row g-0 ">
            <div className="col-md-4">
                <img src={`https://starwars-visualguide.com/assets/img/planets/${store.planets[params.planetid].uid}.jpg`} className="img-fluid rounded-start" alt={`Image of planet ${store.currentPlanet.name}`}/>
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <h1 className="card-title text-dark">{store.planets[params.planetid].name}</h1>
                    <p className="card-text text-dark mt-3">Diameter: {store.planets[params.planetid].diameter}</p>
                    <p className="card-text text-dark">Population: {store.planets[params.planetid].population}</p>
                    <p className="card-text text-dark">Climate: {store.planets[params.planetid].climate}</p>
                    <p className="card-text text-dark">Terrain: {store.planets[params.planetid].terrain}</p>
                    <p className="card-text text-dark">Orbital Period: {store.planets[params.planetid].orbital_period}</p>
                    <p className="card-text text-dark">Rotation Period: {store.planets[params.planetid].rotation_period}</p>
                </div>
            </div>
        </div>
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
