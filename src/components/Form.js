import React, { useState } from "react";

export default function Form({ setUsers, pokemonList }) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    nickname: "",
    email: "",
    password: "",
    birthdate: "",
    phone: "",
    pokemon: "",
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers((prevUsers) => {
      const newUsers = [...prevUsers, formData];
      localStorage.setItem("users", JSON.stringify(newUsers));
      return newUsers;
    });

    setShowPopup(true);

    setFormData({
      name: "",
      surname: "",
      nickname: "",
      email: "",
      password: "",
      birthdate: "",
      phone: "",
      pokemon: "",
    });
  };

  return (
    <div>
      <h2>Registro de PokeUsuario</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
        <input type="text" name="surname" placeholder="Apellido" value={formData.surname} onChange={handleChange} required />
        <input type="text" name="nickname" placeholder="Nickname" value={formData.nickname} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
        <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} required />
        <select name="pokemon" value={formData.pokemon} onChange={handleChange} required>
          <option value="">Elige tu Pokémon favorito</option>
          {pokemonList.map((pokemon, index) => (
            <option key={index} value={pokemon.name}>{pokemon.name}</option>
          ))}
        </select>
        <button type="submit">Registrar</button>
      </form>

      {/* Popup de confirmación */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>¡Registro exitoso!</p>
            <button onClick={() => setShowPopup(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
