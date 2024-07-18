import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams } from 'react-router-dom';


export const PlanetDetails = () => {

    const { store, actions } = useContext(Context);
    const params = useParams();
    const [planetUno, setPlanetUno] = useState({});
    const [planetImage, setPlanetImage] = useState("");

    useEffect(() => {
        if (store.Planets && store.Planets[params.planet]) {
            fetchPlanetData();
        }
    }, [store.Planets, params.planet]);

    const fetchPlanetData = () => {
        fetch(`https://www.swapi.tech/api/planets/${params.planet}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setPlanetUno(data.result.properties);
                const planetImage = `https://starwars-visualguide.com/assets/img/planets/${parseInt(params.planet) + 1}.jpg`;
                setPlanetImage(planetImage);
            })
            .catch((error) => {
                console.error('Error fetching planet:', error);
            });
    };

    if (!store.Planets || !store.Planets[params.planet]) {
        return <div>Loading...</div>;
    }

    const planet = store.Planets[params.planet];

    return (
        !store.Planets ?
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            :
            <div className="card mb-3 mx-auto" style={{ maxWidth: "50rem" }}>

                <div className="row g-0 ">
                    <div className="col-md-4">
                        <img src={planetImage} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                        <h1 className="card-title text-dark">{planet.name}</h1>
                            <p className="card-text text-dark mt-3">Diameter: {planet.height}</p>
                            <p className="card-text text-dark">Population: {planet.gender}</p>
                            <p className="card-text text-dark">Climate: {planet.birth_year}</p>
                            <p className="card-text text-dark">Terrain: {planet.mass}</p>
                            <p className="card-text text-dark">Orbital Period: {planet.hair_color}</p>
                            <p className="card-text text-dark">Rotation Period: {planet.skin_color}</p>
                        </div>
                    </div>
                </div>
            </div>
    )};