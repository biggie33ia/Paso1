import React, { useState } from 'react';
import 'Login.css';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!usuario || !contrasena) {
      setErrorMessage('Por favor, completa todos los campos');
      return;
    }

    try {
      // Aquí se conectaría con tu API de FastAPI
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: usuario,
          password: contrasena
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage('Iniciando sesión...');

        // Guardar token de autenticación
        if (data.access_token) {
          sessionStorage.setItem('authToken', data.access_token);
        }

        // Redirigir a la aplicación principal después de 1.5 segundos
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.detail || 'Error de autenticación');
      }
    } catch (error) {
      // Para demo - simular login exitoso
      console.log('Demo mode: Simulando login con:', { usuario, contrasena });
      setSuccessMessage('Iniciando sesión...');
      setTimeout(() => {
        alert('¡Login exitoso! En un entorno real, serías redirigido al dashboard.');
      }, 1500);
    }
  };

  const showForgotPassword = () => {
    alert('Funcionalidad de recuperación de contraseña - por implementar');
  };

  return (
    <div className="login-container">
      <div className="sena-logo">
        <img src="./Logosimbolo-identidad-SENA-verde-solo.png" alt="Logo SENA" className="sena-logo-img" />
        <div className="sena-text">SENA</div>
        <div className="sena-lines">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
      <h1>INICIO DE SESIÓN</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form id="loginForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="usuario">Usuario</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contrasena">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">Iniciar Sesión</button>
      </form>
      <div className="forgot-password">
        <a href="#" onClick={showForgotPassword}>¿Olvidaste tu contraseña?</a>
      </div>
    </div>
  );
};

export default Login;
