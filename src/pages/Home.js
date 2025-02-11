import React, { useState, useEffect } from "react";
import logo from "../img_1.png";  

function Home() {
  return (
    <header className="app-home">
      <h1>Registro de Entrenadores Pokémon</h1>
      <Carousel />
    </header>
  );
}

function Carousel() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then((response) => response.json())
      .then((data) => {
        const fetchDetails = data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        );

        Promise.all(fetchDetails).then((pokemons) => {
          const formattedPokemons = pokemons.map((p) => ({
            name: p.name,
            image: p.sprites.front_default,
          }));
          setPokemonList(formattedPokemons);
        });
      })
      .catch((error) => console.error("Error al obtener los Pokémon:", error));
  }, [offset]);

  return (
    <div className="carousel-container">
      <button onClick={() => setOffset(offset - limit)} disabled={offset === 0} className="nav-button">
        ◀
      </button>
      <div className="carousel">
        {pokemonList.map((pokemon, index) => (
          <div key={index} className="pokemon-card">
            <img src={pokemon.image} alt={pokemon.name} className="pokemon-img" />
            <p className="pokemon-name">{pokemon.name}</p>
          </div>
        ))}
      </div>
      <button onClick={() => setOffset(offset + limit)} className="nav-button">
        ▶
      </button>
    </div>
  );
}

export default Home;
