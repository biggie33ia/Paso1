import React, { useState, useEffect } from "react";

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    // Simulación de datos de usuarios
    const usuariosMock = [
      { id: 1, nombre: "Juan Pérez", rol: "Aprendiz", correo: "juan@sena.edu.co" },
      { id: 2, nombre: "Ana Torres", rol: "Instructor", correo: "ana@sena.edu.co" },
      { id: 3, nombre: "Carlos Ruiz", rol: "Aprendiz", correo: "carlos@sena.edu.co" },
    ];
    setUsuarios(usuariosMock);
  }, []);

  const eliminarUsuario = (id) => {
    const confirmacion = window.confirm("¿Seguro que deseas eliminar este usuario?");
    if (confirmacion) {
      setUsuarios((prev) => prev.filter((usuario) => usuario.id !== id));
    }
  };

  const usuariosFiltrados =
    filtro === "todos" ? usuarios : usuarios.filter((u) => u.rol === filtro);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestión de Usuarios</h2>

      <div>
        <label>Filtrar por rol: </label>
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="Aprendiz">Aprendices</option>
          <option value="Instructor">Instructores</option>
        </select>
      </div>

      <table border="1" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.rol}</td>
              <td>{usuario.correo}</td>
              <td>
                <button>Editar</button>{" "}
                <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
          {usuariosFiltrados.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No hay usuarios disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
