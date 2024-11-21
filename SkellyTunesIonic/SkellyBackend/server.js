require('dotenv').config(); //variables de entorno.
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/autentificacion'); // Importar las rutas

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/autentificacion', authRoutes); // Usar las rutas de usuarios

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
