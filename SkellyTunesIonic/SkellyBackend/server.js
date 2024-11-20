const express = require('express');
const cors = require('cors');
const db = require('./db'); // Importa el módulo de la base de datos

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint para obtener todos los registros de la base de datos
app.get('/api/usuarios', (req, res) => {
  const sql = 'SELECT * FROM usuarios';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ usuarios: rows });
  });
});

// Endpoint para crear un nuevo usuario
app.post('/api/usuarios', (req, res) => {
  const { nombre, correo } = req.body;
  const sql = 'INSERT INTO usuarios (nombre, correo) VALUES (?, ?)';
  db.run(sql, [nombre, correo], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, nombre, correo });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
