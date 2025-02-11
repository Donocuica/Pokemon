import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Home from "./pages/Home"; // Importar Home
import Form from "./components/Form";
import UserList from "./components/UserList";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const [view, setView] = useState("home"); // Manejo de vistas

  useEffect(() => {
    // Cargar datos de Pokémon
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=20").then((response) => {
      setPokemonList(response.data.results);
      setCarouselImages(
        response.data.results.slice(0, 5).map((pokemon) =>
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split("/")[6]}.png`
        )
      );
    });

    // Cargar usuarios desde localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    // Guardar usuarios en localStorage cuando se actualizan
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (
    <div className="app-container">
      <Header />
      {/* Navegación */}
      <nav>
        <button onClick={() => setView("home")}>Inicio</button>
        <button onClick={() => setView("register")}>Registro</button>
        <button onClick={() => setView("users")}>Usuarios</button>
      </nav>

      <main>
        {/* Vista Home */}
        {view === "home" && <Home carouselImages={carouselImages} />}

        {/* Vista Registro */}
        {view === "register" && <Form setUsers={setUsers} pokemonList={pokemonList} />}

        {/* Vista Usuarios */}
        {view === "users" && <UserList users={users} />}
      </main>

      <Footer />
    </div>
  );
}
