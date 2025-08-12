// auth.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from './connection.js';
import { jwtSecret } from './config.js';
// conectar a la BD
export async function connectDB() {
  try {
    const client = await pool.connect();
    client.release();
    console.log('✅ Conectado a la base de datos PostgreSQL');
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
    throw error; // para que startServer lo detecte
  }
}
// Registrar usuario
export async function registerUser(req, res) {
  const { name, email, password } = req.body;

  try {
    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar en la BD
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email
    `;
    const values = [name, email, hashedPassword];
    const result = await pool.query(query, values);

    res.status(201).json({
      message: '✅ Usuario registrado correctamente',
      user: result.rows[0]
    });

  } catch (err) {
    console.error('❌ Error registrando usuario:', err);
    res.status(500).json({ error: 'Error en el registro' });
  }
}

// Iniciar sesión
export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    // Buscar usuario
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const user = result.rows[0];

    // Comparar contraseñas
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      jwtSecret,
      { expiresIn: '1h' }
    );

    res.json({ message: '✅ Login exitoso', token });

  } catch (err) {
    console.error('❌ Error en login:', err);
    res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
}
// Middleware de autenticación
export function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
}