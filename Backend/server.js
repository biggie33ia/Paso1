const express = import('express');
const { connectDB } = import('./routes/config');

const app = express();
const PORT = 3000;

// Conectar a la base de datos antes de iniciar el servidor
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
app.use(express.json());