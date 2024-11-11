const express = required('express');
const cors = required('cors'); // Importa CORS
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(cors()); // Habilita CORS para todas las rutas

// Ruta de prueba
app.get('/api/data', (req, res) => {
  res.json({ message: 'Datos del backend' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
