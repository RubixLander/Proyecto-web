// routes/artistas.js
const express = require('express');
const router = express.Router();
const db = require('../db');  // Conexión a la base de datos

// Ruta para obtener todos los artistas
router.get('/artistas', (req, res) => {
    // Consulta SQL para obtener los artistas (usuarios con álbumes asociados) y su avatar
    const query = `
        SELECT DISTINCT u.tag, u.nombre, p.avatar
        FROM usuarios u
        JOIN albumartista a ON u.tag = a.usuario_tag
        LEFT JOIN perfiles p ON u.tag = p.tag;
    `;

    // Ejecutamos la consulta en la base de datos
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error al obtener los artistas:', err);
            return res.status(500).json({ message: 'Error al obtener los artistas' });
        }

        // Devolvemos los artistas en formato JSON
        res.status(200).json(rows);
    });
});

module.exports = router;
