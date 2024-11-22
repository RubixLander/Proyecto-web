const express = require('express');
const jwt = require('jsonwebtoken');  // Usamos jsonwebtoken para verificar el token
const db = require('../db');  // Conexión a la base de datos
require('dotenv').config();  // Cargamos las variables del archivo .env (como SECRET_KEY)

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

// Ruta para crear una nueva playlist
router.post('/playlists', verificarToken, (req, res) => {
    const { titulo, detalle, art } = req.body;
    const creador = req.userTag; // El tag del usuario que se ha decodificado

    // Consulta SQL para insertar la nueva playlist
    const query = `
        INSERT INTO playlists (titulo, detalle, art, creador)
        VALUES (?, ?, ?, ?);
    `;

    db.run(query, [titulo, detalle, art, creador], function(err) {
        if (err) {
            console.error('Error al crear la playlist:', err);
            return res.status(500).json({ message: 'Error al crear la playlist' });
        }

        res.status(201).json({
            message: 'Playlist creada con éxito',
            playlist_id: this.lastID
        });
    });
});

// Ruta para obtener las playlists de un usuario
router.get('/usuario/playlists', verificarToken, (req, res) => {
    const userTag = req.userTag; // El tag del usuario que se ha decodificado

    // Consulta SQL para obtener las playlists creadas por el usuario
    const query = `
        SELECT id, titulo, detalle, art, createdat, updatedat
        FROM playlists
        WHERE creador = ?;
    `;

    db.all(query, [userTag], (err, rows) => {
        if (err) {
            console.error('Error al obtener las playlists del usuario:', err);
            return res.status(500).json({ message: 'Error al obtener las playlists del usuario' });
        }

        // Devolvemos las playlists creadas por el usuario
        res.status(200).json(rows);
    });
});

// Ruta para obtener todas las playlists
router.get('/playlists', (req, res) => {
    // Consulta SQL para obtener todas las playlists
    const query = `
        SELECT p.id, p.titulo AS playlist_titulo, p.detalle, p.art, p.createdat, p.updatedat, u.nombre AS creador_nombre
        FROM playlists p
        JOIN usuarios u ON p.creador = u.tag;
    `;

    db.all(query, [], (err, playlists) => {
        if (err) {
            console.error('Error al obtener todas las playlists:', err);
            return res.status(500).json({ message: 'Error al obtener las playlists' });
        }

        if (playlists.length > 0) {
            return res.status(200).json(playlists);  // Devolver todas las playlists encontradas
        } else {
            return res.status(404).json({ message: 'No se encontraron playlists' });
        }
    });
});

module.exports = router;
