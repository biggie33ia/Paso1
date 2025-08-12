// db.js
import pkg from 'pg';
import { dbConfig } from './config.js';

const { Pool } = pkg;

// Crear un pool de conexiones
export const pool = new Pool(dbConfig);

// Probar la conexión
(async () => {
  try {
    const client = await pool.connect();
    console.log(`✅ Conectado a la base de datos ${dbConfig.database} en ${dbConfig.host}:${dbConfig.port}`);
    client.release();
  } catch (error) {
    console.error("❌ Error conectando a la base de datos:", error);
  }
})();

// Función para crear la tabla
export async function createTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL
    )
  `;
  await pool.query(query);
  console.log("✅ Tabla 'users' creada o ya existente.");
}

// Función para insertar usuario
export async function insertUser(name, email) {
  const query = `
    INSERT INTO users (name, email)
    VALUES ($1, $2)
  `;
  await pool.query(query, [name, email]);
  console.log(`✅ Usuario ${name} insertado correctamente.`);
}
