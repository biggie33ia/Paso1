import React, { useState } from 'react';
import GestionUsuarios from './Admin/GestionUsuarios';

const AdministradorP = () => {
  const [vistaActual, setVistaActual] = useState('inicio');

  return (
    <div style={{ textAlign: 'center' }}>
      {vistaActual === 'inicio' && (
        <div>
          <h2>Panel del Administrador</h2>
          <button onClick={() => setVistaActual('usuarios')}>Gestionar Usuarios</button>
          {/* Agrega aquí más botones para otros submódulos si los necesitas */}
        </div>
      )}

      {vistaActual === 'usuarios' && (
        <div>
          <GestionUsuarios />
          <button onClick={() => setVistaActual('inicio')}>Volver</button>
        </div>
      )}
    </div>
  );
};

export default AdministradorP;
