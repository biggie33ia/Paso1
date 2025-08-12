// config.js
// config.js
import dotenv from 'dotenv';
dotenv.config();
// Configuración de la base de datos
export const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'procesos',
  password: 'Milu8910',
  port: 5432, // Puerto por defecto de PostgreSQL
};

export const jwtSecret = 'tu_secreto_jwt_aqui';
