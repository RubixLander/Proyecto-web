const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('../db'); // Conexión a la base de datos
require('dotenv').config();  // Cargar las variables del archivo .env

const router = express.Router();


// Ruta para reproducir una canción
router.get('/reproducirCancion/:cancionId', (req, res) => {
    const cancionId = req.params.cancionId;

    // Verificar si la canción existe en la base de datos
    const sql = 'SELECT * FROM canciones WHERE id = ?';
    db.get(sql, [cancionId], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Error al consultar la base de datos.' });
        }

        if (!row) {
            return res.status(404).json({ error: 'Canción no encontrada.' });
        }

        // Obtener la ruta relativa del archivo de la canción desde la base de datos
        const archivoPath = row.archivo_path;

        // Generar la ruta absoluta para el archivo de la canción
        const absolutePath = path.resolve(__dirname, '..', archivoPath);  // 'uploads/canciones/cancion.mp3'
        console.log('Ruta absoluta generada:', absolutePath);

        // Verificar si el archivo existe en el sistema de archivos
        fs.stat(absolutePath, (err, stats) => {
            if (err || !stats.isFile()) {
                return res.status(404).json({ error: 'Archivo de la canción no encontrado.' });
            }

            // Enviar el archivo de la canción al cliente
            res.sendFile(absolutePath);
        });
    });
});

//Obtener canciones de un album
router.get('/obtenerCanciones/:albumId', (req, res) => {
    const albumId = req.params.albumId; // Captura el ID del álbum desde la URL

    const query = `
        SELECT 
            id AS cancion_id, 
            track, 
            titulo AS cancion_titulo, 
            duracion, 
            archivo_path 
        FROM canciones
        WHERE album = ?`;

    db.all(query, [albumId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Si no hay canciones para ese albumId, se responde con un arreglo vacío
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron canciones para este álbum.' });
        }

        // Devolver las canciones encontradas
        res.json({ canciones: rows });
    });
});

module.exports = router;
