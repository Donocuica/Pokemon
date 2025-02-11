import React from "react";
import logo from "../img_1.png";  // Ruta correcta dentro de `src/`
import "../App.css"; 

const Header = () => {
  return (
    <header>
      <img src={logo} className="app-logo" alt="Pokémon Logo" />
    </header>
  );
};

export default Header;
