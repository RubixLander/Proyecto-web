// routes/comunidades.js
const express = require('express');
const router = express.Router();
const db = require('../db');  // Conexión a la base de datos

// Ruta para obtener todas las comunidades
router.get('/comunidades', (req, res) => {
    // Consulta SQL para obtener todas las comunidades
    const query = `
        SELECT c.id, c.nombre, c.creador, c.headerText, u.nombre AS creador_nombre
        FROM comunidades c
        JOIN usuarios u ON c.creador = u.tag;
    `;

    // Ejecutamos la consulta en la base de datos
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error al obtener las comunidades:', err);
            return res.status(500).json({ message: 'Error al obtener las comunidades' });
        }

        // Devolvemos las comunidades en formato JSON
        res.status(200).json(rows);
    });
});

module.exports = router;