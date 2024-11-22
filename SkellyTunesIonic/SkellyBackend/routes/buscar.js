const express = require('express');
const db = require('../db');  // Tu conexión a la base de datos
const router = express.Router();

// Ruta para buscar álbumes
router.get('/albumes', (req, res) => {
    const { busqueda } = req.query; // El término de búsqueda se pasa como parámetro query
    // Imprimir la búsqueda que ha llegado
    console.log('Búsqueda recibida:', busqueda);
    try {
        // Consulta SQL para buscar álbumes por título o artista
        const query = `
            SELECT a.id, a.coverart, a.titulo AS album_titulo, u.nombre AS artista_nombre,
                   (SELECT id FROM canciones WHERE album = a.id AND track = 1) AS primera_cancion_id
            FROM albums a
            JOIN albumartista aa ON a.id = aa.album_id
            JOIN usuarios u ON aa.usuario_tag = u.tag
            WHERE a.titulo LIKE ? OR u.nombre LIKE ?;
        `;
        db.all(query, [`%${busqueda}%`, `%${busqueda}%`], (err, albums) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error al buscar álbumes' });
            }

            if (albums.length > 0) {
                return res.json(albums); // Incluir el id en la respuesta
            } else {
                return res.status(404).json({ message: 'No se encontraron álbumes o artistas' });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al buscar álbumes' });
    }
});



// Ruta para buscar artistas
router.get('/artistas', (req, res) => {
    const { busqueda } = req.query; // El término de búsqueda se pasa como parámetro query

    try {
        // Consulta SQL para buscar artistas por nombre o tag
        const query = `
            SELECT p.avatar, u.nombre, u.tag
            FROM usuarios u
            JOIN perfiles p ON u.tag = p.tag
            WHERE u.nombre LIKE ? OR u.tag LIKE ?;
        `;
        db.all(query, [`%${busqueda}%`, `%${busqueda}%`], (err, artistas) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error al buscar artistas' });
            }

            if (artistas.length > 0) {
                return res.json(artistas);
            } else {
                return res.status(404).json({ message: 'No se encontraron artistas' });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al buscar artistas' });
    }
});

// Ruta para buscar canciones
router.get('/buscar/canciones', (req, res) => {
    const { busqueda } = req.query; // El término de búsqueda se pasa como parámetro query

    try {
        // Consulta SQL para buscar canciones por título, álbum o artista
        const query = `
            SELECT c.coverart, c.track, c.titulo AS cancion_titulo, c.duracion, u.nombre AS artista_nombre, a.titulo AS album_titulo
            FROM canciones c
            JOIN albums a ON c.album = a.id
            JOIN albumartista aa ON a.id = aa.album_id
            JOIN usuarios u ON aa.usuario_tag = u.tag
            WHERE c.titulo LIKE ? OR a.titulo LIKE ? OR u.nombre LIKE ?;
        `;
        db.all(query, [`%${busqueda}%`, `%${busqueda}%`, `%${busqueda}%`], (err, canciones) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error al buscar canciones' });
            }

            if (canciones.length > 0) {
                return res.json(canciones);
            } else {
                return res.status(404).json({ message: 'No se encontraron canciones' });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al buscar canciones' });
    }
});

// Ruta para buscar playlists
router.get('/buscar/playlists', (req, res) => {
    const { busqueda } = req.query;  // El término de búsqueda se pasa como parámetro query

    try {
        // Consulta SQL para buscar playlists por título o creador
        const query = `
            SELECT p.id, p.titulo AS playlist_titulo, p.detalle, p.art, u.nombre AS creador_nombre
            FROM playlists p
            JOIN usuarios u ON p.creador = u.tag
            WHERE p.titulo LIKE ? OR u.nombre LIKE ?;
        `;

        db.all(query, [`%${busqueda}%`, `%${busqueda}%`], (err, playlists) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error al buscar playlists' });
            }

            if (playlists.length > 0) {
                return res.json(playlists);  // Devuelve los playlists encontrados
            } else {
                return res.status(404).json({ message: 'No se encontraron playlists' });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al buscar playlists' });
    }
});

module.exports = router;
