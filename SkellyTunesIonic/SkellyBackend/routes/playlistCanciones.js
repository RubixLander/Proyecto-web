// routes/playlistCanciones.js
const express = require('express');
const db = require('../db');  // Conexión a la base de datos
const router = express.Router();

// Middleware para verificar que el usuario está autenticado (simplificado)
const verificarToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }
    // Aquí deberías decodificar el token y extraer el tag del usuario
    req.userTag = 'userTagEjemplo';  // Simulando el tag del usuario
    next();
};

// Ruta para agregar canciones a una playlist
router.post('/playlist/:playlistId/canciones', verificarToken, (req, res) => {
    const { playlistId } = req.params;  // ID de la playlist
    const { canciones } = req.body;    // Array de IDs de las canciones a agregar

    if (!Array.isArray(canciones) || canciones.length === 0) {
        return res.status(400).json({ message: 'Debe proporcionar al menos una canción' });
    }

    // Verificamos que la playlist existe
    const queryPlaylist = `SELECT id FROM playlists WHERE id = ?`;
    db.get(queryPlaylist, [playlistId], (err, row) => {
        if (err) {
            console.error('Error al verificar la playlist:', err);
            return res.status(500).json({ message: 'Error al verificar la playlist' });
        }
        if (!row) {
            return res.status(404).json({ message: 'Playlist no encontrada' });
        }

        // Verificamos que las canciones existan
        const queryCanciones = `SELECT id FROM canciones WHERE id IN (${canciones.map(() => '?').join(',')})`;
        db.all(queryCanciones, canciones, (err, rows) => {
            if (err) {
                console.error('Error al verificar las canciones:', err);
                return res.status(500).json({ message: 'Error al verificar las canciones' });
            }
            if (rows.length !== canciones.length) {
                return res.status(404).json({ message: 'Una o más canciones no existen' });
            }

            // Insertamos las canciones en la tabla playlistcanciones
            const queryInsert = `INSERT INTO playlistcanciones (playlist_id, cancion_id) VALUES (?, ?)`;
            const insertarCanciones = canciones.map(cancionId => {
                return new Promise((resolve, reject) => {
                    db.run(queryInsert, [playlistId, cancionId], function(err) {
                        if (err) {
                            console.error('Error al insertar la canción en la playlist:', err);
                            return reject(err);
                        }
                        resolve();
                    });
                });
            });

            // Esperamos que todas las canciones se hayan insertado correctamente
            Promise.all(insertarCanciones)
                .then(() => {
                    res.status(201).json({ message: 'Canciones agregadas a la playlist exitosamente' });
                })
                .catch(err => {
                    res.status(500).json({ message: 'Error al agregar las canciones a la playlist' });
                });
        });
    });
});

module.exports = router;