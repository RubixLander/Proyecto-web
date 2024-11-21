const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');  // Librería para conectar a SQLite
const { Buffer } = require('buffer'); // Para manejar la decodificación

// Establecer la conexión a SQLite
const db = new sqlite3.Database('./db/musicLibrary.db');  // Ajusta la ruta a tu base de datos

// Función para decodificar los tags
const decodeTag = (encodedTag) => {
    // Aquí decodificamos el tag si está en base64. Si no está en base64, esta función puede cambiar.
    return Buffer.from(encodedTag, 'base64').toString('utf-8');
};

router.get('/bibliotecaUsuario/:tag', async (req, res) => {
    const { tag: encodedTag } = req.params;
    const tag = decodeTag(encodedTag);  // Decodificamos el tag recibido

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
        db.all(queryAlbums, [tag], (err, albums) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error al obtener los álbumes' });
            }

            // Obtener las canciones del usuario (de los que es creador de álbumes)
            const queryCanciones = `
                SELECT c.coverart, c.track, c.titulo AS cancion_titulo, c.duracion, u.nombre AS artista_nombre, a.titulo AS album_titulo
                FROM canciones c
                JOIN albums a ON c.album = a.id
                JOIN albumartista aa ON a.id = aa.album_id
                JOIN usuarios u ON aa.usuario_tag = u.tag
                WHERE aa.usuario_tag = ?;
            `;
            db.all(queryCanciones, [tag], (err, canciones) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Error al obtener las canciones' });
                }

                // Obtener los artistas que siguen (usuarios que están en la tabla seguidosUsuarios)
                const queryArtistas = `
                    SELECT p.avatar, u.nombre, u.tag
                    FROM usuarios u
                    JOIN perfiles p ON u.tag = p.tag
                    WHERE u.tag IN (SELECT seguido_tag FROM seguidosUsuarios WHERE seguidor_tag = ?);
                `;
                db.all(queryArtistas, [tag], (err, artistas) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: 'Error al obtener los artistas seguidos' });
                    }

                    return res.json({
                        albums,
                        canciones,
                        artistas
                    });
                });
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener la biblioteca de música' });
    }
});

module.exports = router;
