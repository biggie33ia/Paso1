import React, { useState } from 'react';
// Importaremos estilos después
import './instructorP.css';

function InstructorP() {
  const [seccionActiva, setSeccionActiva] = useState('cursos');

  return (
    <div className="panel">
      <h1 className="titulo">Panel del Instructor</h1>
      <div className="botones-navegacion">
        <button onClick={() => setSeccionActiva('cursos')}>📘 Cursos</button>
        <button onClick={() => setSeccionActiva('comite')}>📋 Citaciones</button>
        <button onClick={() => setSeccionActiva('reportes')}>📊 Reportes</button>
      </div>

      {seccionActiva === 'cursos' && <SeccionCursos />}
      {seccionActiva === 'comite' && <SeccionComite />}
      {seccionActiva === 'reportes' && <SeccionReportes />}
    </div>
  );
}

// COMPONENTES SECUNDARIOS

const SeccionCursos = () => {
  const [curso, setCurso] = useState({
    nombre: '',
    ficha: '',
    acta: null,
  });

  const handleInputChange = (e) => {
    setCurso({
      ...curso,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setCurso({
      ...curso,
      acta: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!curso.acta) {
      alert("Por favor, selecciona un archivo.");
      return;
    }

    // Simulación: mostrar información del curso
    alert(`Curso creado:\nNombre: ${curso.nombre}\nFicha: ${curso.ficha}\nArchivo: ${curso.acta.name}`);
    
    // Luego aquí se enviaría al backend con FormData
  };

  return (
    <div>
      <h2>➕ Crear Curso</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Curso:</label><br />
          <input
            type="text"
            name="nombre"
            value={curso.nombre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Ficha del Curso:</label><br />
          <input
            type="text"
            name="ficha"
            value={curso.ficha}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Subir Acta de Inicio (PDF o DOCX):</label><br />
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Crear Curso</button>
      </form>
    </div>
  );
};


const SeccionComite = () => (
  <div>
    <h2>Gestión de Citaciones</h2>
    <button>📅 Crear Citación</button>
    <button>⬆️ Subir Formulario</button>
  </div>
);

const SeccionReportes = () => (
  <div>
    <h2>Reportes de Rendimiento</h2>
    <button>📄 Actas de Seguimiento</button>
    <button>📋 Actas de Reunión</button>
    <button>⚖️ Juicios Evaluativos</button>
  </div>
);

export default InstructorP;
