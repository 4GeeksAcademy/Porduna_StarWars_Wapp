import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams } from 'react-router-dom';


export const CharacterDetails = () => {

    const { store, actions } = useContext(Context);
    const params = useParams();
    console.log(params);
    const [characterUno, setCharacterUno] = useState({});
    const [characterImage, setCharacterImage] = useState("");

    useEffect(() => {
        if (store.Characters && store.Characters[params.id]) {
            fetchCharacterData();
        }
    }, [store.Characters, params.id]);

    const fetchCharacterData = () => {
        fetch(`https://www.swapi.tech/api/people/${parseInt(params.id) + 1}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setCharacterUno(data.result.properties);
                const characterImage = `https://starwars-visualguide.com/assets/img/characters/${parseInt(params.id) + 1}.jpg`;
                setCharacterImage(characterImage);
            })
            .catch((error) => {
                console.error('Error fetching character:', error);
            });
    };

    if (!store.Characters || !store.Characters[params.id]) {
        return <div>Loading...</div>;
    }

    const character = store.Characters[params.id];

    return (
        !store.Characters ?
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
                            <h1 className="card-title text-dark">{character.name}</h1>
                            <p className="card-text text-dark mt-3">Height: {character.height}</p>
                            <p className="card-text text-dark">Gender: {character.gender}</p>
                            <p className="card-text text-dark">Birth: {character.birth_year}</p>
                            <p className="card-text text-dark">Mass: {character.mass}</p>
                            <p className="card-text text-dark">Hair: {character.hair_color}</p>
                            <p className="card-text text-dark">Skin: {character.skin_color}</p>
                            <p className="card-text text-dark">Eyes: {character.eye_color}</p>
                        </div>
                    </div>
                </div>
            </div>
    )};