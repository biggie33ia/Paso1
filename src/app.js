import express from 'express';
import { registerUser, loginUser, authenticateToken } from '../Backend/routes/auth.js';
import { createTable } from '../DB/db.js';
import { connectDB } from '../Backend/routes/connection.js'; // Ajusta ruta según tu estructura

const app = express();
const PORT = 3000;

app.use(express.json());


// Ruta protegida
app.get('/protected', authenticateToken, (req, res) => {
  res.send(`Acceso concedido a ruta protegida. Usuario: ${req.user.email}`);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
// Ruta raíz para verificar servidor
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

// Rutas
app.get('/create-table', async (req, res) => {
  try {
    await createTable();
    res.send('Tabla creada correctamente');
  } catch (err) {
    console.error('Error creando tabla:', err);
    res.status(500).send('Error creando tabla');
  }
});

app.post('/register', registerUser);
app.post('/login', loginUser);
app.get('/protected', authenticateToken, (req, res) => {
  res.send(`Acceso concedido a ruta protegida. Usuario: ${req.user.email}`);
});

async function startServer() {
  try {
    await connectDB();  // conectar a la BD primero
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

// Iniciar servidor después de conexión a DB
startServer();
 