import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams } from 'react-router-dom';


export const PlanetDetails = () => {

    const { store, actions } = useContext(Context);
    const params = useParams();
    const [characterUno, setCharacterUno] = useState({});
    const [characterImage, setCharacterImage] = useState("");

    useEffect(() => {
        if (store.Planets && store.Planets[params.character]) {
            fetchCharacterData();
        }
    }, [store.Planets, params.character]);

    const fetchCharacterData = () => {
        fetch(`https://www.swapi.tech/api/people/${params.character}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setCharacterUno(data.result.properties);
                const characterImage = `https://starwars-visualguide.com/assets/img/planets/${parseInt(params.character) + 1}.jpg`;
                setCharacterImage(characterImage);
            })
            .catch((error) => {
                console.error('Error fetching character:', error);
            });
    };

    if (!store.Planets || !store.Planets[params.character]) {
        return <div>Loading...</div>;
    }

    const character = store.Planets[params.character];

    return (
        !store.Planets ?
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            :
            <div className="card mb-3 mx-auto" style={{ maxWidth: "50rem" }}>

                <div className="row g-0 ">
                    <div className="col-md-4">
                        <img src={characterImage} className="img-fluid rounded-start" alt="..." />
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