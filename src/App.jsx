import React, { useState } from 'react';
import InstructorP from './components/InstructorP';
import AlumnoP from './components/AlumnoP';
import AdministradorP from './components/AdministradorP';
import GestionUsuarios from './components/Admin/GestionUsuarios';
import Login from './components/Login';

function App() {
  const [rolSeleccionado, setRolSeleccionado] = useState(null);

  const renderizarPanel = () => {
    switch (rolSeleccionado) {
      case 'instructor':
        return <InstructorP />;
      case 'estudiante':
        return <AlumnoP />;
      case 'admin':
        return <AdministradorP />;
      default:
        return <p>Selecciona un rol para continuar</p>;
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '30px' }}>
      <h1>Gestión Académica</h1>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setRolSeleccionado('instructor')}>Instructor</button>
        <button onClick={() => setRolSeleccionado('estudiante')}>Estudiante</button>
        <button onClick={() => setRolSeleccionado('admin')}>Administrador</button>
      </div>
      {renderizarPanel()}
    </div>
  );
}

export default App;
