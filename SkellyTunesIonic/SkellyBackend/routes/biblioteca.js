const express = require('express');
const router = express.Router();
const db = require('../db');  // Tu conexión a la base de datos

router.get('/bibliotecaUsuario/:tag', async (req, res) => {
    const { tag } = req.params;

    try {
        // Obtener los álbumes del usuario (de los que es creador)
        const queryAlbums = `
            SELECT a.coverart, a.titulo AS album_titulo, u.nombre AS artista_nombre, p.avatar AS artista_avatar
            FROM albums a
            JOIN albumartista aa ON a.id = aa.album_id
            JOIN usuarios u ON aa.usuario_tag = u.tag
            JOIN perfiles p ON u.tag = p.tag
            WHERE aa.usuario_tag = ?;
        `;
        const [albums] = await db.query(queryAlbums, [tag]);

        // Obtener las canciones del usuario (de los que es creador de álbumes)
        const queryCanciones = `
            SELECT c.coverart, c.track, c.titulo AS cancion_titulo, c.duracion, u.nombre AS artista_nombre, a.titulo AS album_titulo
            FROM canciones c
            JOIN albums a ON c.album = a.id
            JOIN albumartista aa ON a.id = aa.album_id
            JOIN usuarios u ON aa.usuario_tag = u.tag
            WHERE aa.usuario_tag = ?;
        `;
        const [canciones] = await db.query(queryCanciones, [tag]);

        // Obtener los artistas que siguen (usuarios que están en la tabla seguidosUsuarios)
        const queryArtistas = `
            SELECT p.avatar, u.nombre, u.tag
            FROM usuarios u
            JOIN perfiles p ON u.tag = p.tag
            WHERE u.tag IN (SELECT seguido_tag FROM seguidosUsuarios WHERE seguidor_tag = ?);
        `;
        const [artistas] = await db.query(queryArtistas, [tag]);

        return res.json({
            albums,
            canciones,
            artistas
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener la biblioteca de música' });
    }
});

module.exports = router;