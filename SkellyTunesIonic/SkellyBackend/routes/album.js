const express = require('express');
const db = require('../db');  // Importa la conexión a la base de datos
const router = express.Router();

// Función para decodificar los tags
const decodeTag = (encodedTag) => {
  // Aquí decodificamos el tag si está en base64. Si no está en base64, esta función puede cambiar.
  return Buffer.from(encodedTag, 'base64').toString('utf-8');
};

// Ruta para obtener todos los álbumes
router.get('/albums', (req, res) => {
  const query = `
    SELECT a.id, a.coverart, a.titulo AS album_titulo, a.año, u.nombre AS artista_nombre
    FROM albums a
    JOIN albumartista aa ON a.id = aa.album_id
    JOIN usuarios u ON aa.usuario_tag = u.tag
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error al obtener los álbumes', err);
      return res.status(500).json({ message: 'Error al obtener los álbumes' });
    }
    return res.json(rows); // Devuelve los álbumes en formato JSON
  });
});

router.get('/albumsUsuario/:tag', async (req, res) => {
  const { tag } = req.params;
  const decodedTag = decodeURIComponent(tag);
  console.log('Tag de albumes:', decodedTag);  // Verifica que el valor sea correcto

  try {
      // Obtener los álbumes del usuario (de los que es creador)
      const queryAlbums = `
          SELECT a.id AS album_id, a.coverart, a.titulo AS album_titulo, u.nombre AS artista_nombre, u.tag AS artista_tag
          FROM albums a
          JOIN albumartista aa ON a.id = aa.album_id
          JOIN usuarios u ON aa.usuario_tag = u.tag
          JOIN perfiles p ON u.tag = p.tag
          WHERE aa.usuario_tag = ?;  -- Solo los álbumes del usuario especificado
      `;

      db.all(queryAlbums, [tag], (err, albums) => {
          if (err) {
              console.error(err);
              return res.status(500).json({ message: 'Error al obtener los álbumes' });
          }

          // Si no hay álbumes, devolver un array vacío
          if (!albums || albums.length === 0) {
              return res.status(404).json({ message: 'No se encontraron álbumes para este usuario' });
          }

          // Si se encuentran álbumes, devolverlos
          return res.json({
              albums
          });
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al obtener los álbumes' });
  }
});




module.exports = router; // Exporta el router para ser usado en server.js
