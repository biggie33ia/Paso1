// connection.js
import pkg from "pg";
const { Client, Pool } = pkg;  // Extraemos Client y Pool juntos
import { dbConfig } from "../../DB/config.js";

// Creamos un pool de conexiones
export const pool = new Pool(dbConfig);

// Función para probar conexión
export async function connectDB() {
  try {
    const client = await pool.connect();
    client.release();
    console.log('✅ Conectado a PostgreSQL');
  } catch (error) {
    console.error('❌ Error conectando a PostgreSQL:', error);
    throw error;  // para que el servidor sepa que no se pudo conectar
  }
}

// Crear una conexión independiente
export function createConnection() {
  const client = new Client(dbConfig);
  return client;
}

// Crear tabla si no existe
export async function createTable() {
  const client = createConnection();
  await client.connect();
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL
    )
  `;
  await client.query(query);
  await client.end();
  console.log("✅ Tabla 'users' creada o ya existente.");
}

// Insertar usuario
export async function insertUser(name, email) {
  const client = createConnection();
  await client.connect();
  const query = `
    INSERT INTO users (name, email)
    VALUES ($1, $2)
  `;
  await client.query(query, [name, email]);
  await client.end();
  console.log(`✅ Usuario ${name} insertado correctamente.`);
}

// Obtener conexión (similar a get_db_connection en Python)
export function getDbConnection() {
  return createConnection();
}
