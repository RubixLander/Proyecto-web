const express = require('express');
const db = require('../db');  // Importa la conexión a la base de datos
const router = express.Router();

// Ruta para obtener todos los álbumes
router.get('/albums', (req, res) => {
  const query = `
    SELECT a.id, a.coverart, a.titulo AS album_titulo, a.año, u.nombre AS artista_nombre
    FROM albums a
    JOIN albumartista aa ON a.id = aa.album_id
    JOIN usuarios u ON aa.usuario_tag = u.tag
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error al obtener los álbumes', err);
      return res.status(500).json({ message: 'Error al obtener los álbumes' });
    }
    return res.json(rows); // Devuelve los álbumes en formato JSON
  });
});

module.exports = router; // Exporta el router para ser usado en server.js
