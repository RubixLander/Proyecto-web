const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('../db'); // Conexión a la base de datos
const jwt = require('jsonwebtoken'); // Necesitamos este paquete para verificar el JWT
require('dotenv').config();  // Cargar las variables del archivo .env

const router = express.Router();
const secretKey = process.env.SECRET_KEY;

// Middleware para verificar y decodificar el token
const verificarToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token no válido' });
        }

        // Guardamos el tag del usuario en la solicitud para usarlo en la siguiente etapa
        req.userTag = decoded.tag;
        next(); // Continuamos con la siguiente función en la pila
    });
};

// Ruta para reproducir una canción
router.get('/reproducirCancion/:cancionId', verificarToken, (req, res) => {
    const cancionId = req.params.cancionId;

    // Verificar si la canción existe
    const sql = 'SELECT * FROM canciones WHERE id = ?';
    db.get(sql, [cancionId], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Error al consultar la base de datos.' });
        }

        if (!row) {
            return res.status(404).json({ error: 'Canción no encontrada.' });
        }

        // Obtener la ruta del archivo de la canción
        const archivoPath = row.archivo_path;

        // Verificar si el archivo existe en el sistema de archivos
        fs.stat(archivoPath, (err, stats) => {
            if (err || !stats.isFile()) {
                return res.status(404).json({ error: 'Archivo de la canción no encontrado.' });
            }

            // Enviar el archivo de la canción al cliente
            res.sendFile(path.resolve(archivoPath));
        });
    });
});

module.exports = router; 