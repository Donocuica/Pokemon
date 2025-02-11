import React from "react";
import "../App.css";

function UserList({ users, setUsers }) {
  return (
    <div className="user-list">
      <h2>Entrenadores Registrados</h2>
      {users.length === 0 ? (
        <p>No hay entrenadores registrados.</p>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.name} ({user.nickname}) - {user.pokemon}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


export default UserList;
