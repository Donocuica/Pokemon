import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PokemonSelect({ onSelect }) {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon/").then((response) => {
      setPokemons(response.data.results);
    });
  }, []);

  return (
    <select
      onChange={(e) => {
        const selectedPokemon = pokemons.find(p => p.name === e.target.value);
        onSelect(selectedPokemon.name, `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemons.indexOf(selectedPokemon) + 1}.png`);
      }}
      className="border p-2 w-full mb-2"
    >
      <option value="">Selecciona un Pokémon</option>
      {pokemons.map((pokemon) => (
        <option key={pokemon.name} value={pokemon.name}>
          {pokemon.name}
        </option>
      ))}
    </select>
  );
}
