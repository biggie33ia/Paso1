import React, { useState } from "react";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulación de roles por usuario
    if (usuario === "admin") onLogin("admin");
    else if (usuario === "instructor") onLogin("instructor");
    else if (usuario === "aprendiz" || usuario === "estudiante") onLogin("estudiante");
    else setMensaje("Credenciales no válidas");
  };

return (
    <div className="login-container">
        <div className="login-card">
            <div className="logo-sena">
                <img
                    src="/Logosimbolo-identidad-SENA-verde-solo.png"
                    alt="SENA logo in green, featuring a stylized person with arms outstretched. The logo appears above the text SENA in bold letters, set within a welcoming login interface."
                />
                <h2>SENA</h2>
            </div>
            <h3>INICIO DE SESIÓN</h3>

            {mensaje && <div className="login-error">{mensaje}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="usuario">Usuario</label>
                    <input
                        type="text"
                        id="usuario"
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
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn-login">Iniciar Sesión</button>
            </form>

            <div className="forgot-password">
                <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
        </div>
    </div>
);
};

export default Login;
