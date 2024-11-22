const express = require('express');
const db = require('../db'); // Asegúrate de que este es el archivo que tiene la conexión a SQLite
const decodeURIComponent = require('querystring').decodeURIComponent; // Para decodificar el 'tag'
const router = express.Router();

// Ruta para obtener los álbumes y canciones de un usuario por su tag
router.get('/albumsUsuario/:tag', async (req, res) => {
  const { tag } = req.params;
  const decodedTag = decodeURIComponent(tag);  // Decodificamos el tag
  console.log('Tag de álbumes:', decodedTag);

  try {
    // Consultar los álbumes del usuario (los que ha creado) junto con sus canciones
    const queryAlbums = `
      SELECT 
        a.id AS album_id, 
        a.coverart, 
        a.titulo AS album_titulo, 
        a.año, 
        u.nombre AS artista_nombre, 
        u.tag AS artista_tag,
        c.id AS cancion_id, 
        c.track, 
        c.titulo AS cancion_titulo, 
        c.duracion, 
        c.archivo_path
      FROM albums a
      JOIN albumartista aa ON a.id = aa.album_id
      JOIN usuarios u ON aa.usuario_tag = u.tag
      LEFT JOIN canciones c ON c.album = a.id
      WHERE aa.usuario_tag = ?;
    `;

    // Ejecutamos la consulta en la base de datos (SQLite)
    db.all(queryAlbums, [decodedTag], (err, albums) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al obtener los álbumes y canciones' });
      }

      // Si no hay resultados, respondemos con un mensaje adecuado
      if (!albums || albums.length === 0) {
        return res.status(404).json({ message: 'No se encontraron álbumes para este usuario' });
      }

      // Organizar los resultados en una estructura más fácil de manejar
      const albumsWithSongs = albums.reduce((acc, album) => {
        const albumId = album.album_id;

        // Si no existe el álbum en el acumulador, lo inicializamos
        if (!acc[albumId]) {
          acc[albumId] = {
            album_id: album.album_id,
            coverart: album.coverart,
            album_titulo: album.album_titulo,
            año: album.año,
            artista_nombre: album.artista_nombre,
            artista_tag: album.artista_tag,
            canciones: []
          };
        }

        // Si la canción existe (es decir, no es null), la agregamos al álbum correspondiente
        if (album.cancion_id) {
          acc[albumId].canciones.push({
            cancion_id: album.cancion_id,
            track: album.track,
            cancion_titulo: album.cancion_titulo,
            duracion: album.duracion,
            archivo_path: album.archivo_path
          });
        }

        return acc;
      }, {});

      // Devolvemos la respuesta con todos los álbumes y sus canciones
      return res.json({
        albums: Object.values(albumsWithSongs) // Convertimos el objeto acumulador en un array
      });
    });

  } catch (error) {
    // Manejo de cualquier error inesperado
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener los álbumes y canciones' });
  }
});

module.exports = router;
