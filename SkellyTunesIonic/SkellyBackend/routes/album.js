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
    SELECT 
      a.id, 
      a.coverart, 
      a.titulo AS album_titulo, 
      a.año, 
      u.nombre AS artista_nombre,
      fc.id AS primera_cancion_id  -- Solo obtenemos el id de la canción con track = 1
    FROM albums a
    JOIN albumartista aa ON a.id = aa.album_id
    JOIN usuarios u ON aa.usuario_tag = u.tag
    LEFT JOIN canciones c ON a.id = c.album
    LEFT JOIN canciones fc ON a.id = fc.album AND fc.track = 1  -- Filtra por la canción con track = 1
    WHERE fc.track = 1  -- Solo se incluirán los álbumes que tienen una canción con track = 1
    GROUP BY a.id, a.coverart, a.titulo, a.año, u.nombre
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error al obtener los álbumes', err);
      return res.status(500).json({ message: 'Error al obtener los álbumes' });
    }
    return res.json(rows); // Devuelve los álbumes con el id de la canción con track = 1
  });
});


router.get('/albumsUsuario/:tag', async (req, res) => {
  const { tag } = req.params;
  const decodedTag = decodeURIComponent(tag);
  console.log('Tag de albumes:', decodedTag);  // Verifica que el valor sea correcto

  try {
      // Obtener los álbumes del usuario (de los que es creador)
      const queryAlbums = `
          SELECT 
              a.id AS album_id, 
              a.coverart, 
              a.titulo AS album_titulo, 
              u.nombre AS artista_nombre, 
              u.tag AS artista_tag,
              c.id AS primera_cancion_id  
          FROM albums a
          JOIN albumartista aa ON a.id = aa.album_id
          JOIN usuarios u ON aa.usuario_tag = u.tag
          JOIN perfiles p ON u.tag = p.tag
          LEFT JOIN canciones c ON a.id = c.album AND c.track = 1  
          WHERE aa.usuario_tag = ?; 
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


// ruta obtener datos para reproductor
router.get('/datosalbum/:album_id', (req, res) => {
  const albumId = req.params.album_id;

  const query = `
  SELECT 
      albums.coverart,
      albums.titulo AS album_titulo,
      usuarios.nombre AS artista_nombre,
      usuarios.tag AS artista_tag,
      perfiles.avatar AS artista_avatar
  FROM 
      albums
  JOIN 
      albumartista ON albums.id = albumartista.album_id
  JOIN 
      usuarios ON albumartista.usuario_tag = usuarios.tag
  JOIN
      perfiles ON usuarios.tag = perfiles.tag
  WHERE 
      albums.id = ?;
`;

  db.get(query, [albumId], (err, row) => {
      if (err) {
          console.error('Error al ejecutar la consulta:', err.message);
          res.status(500).json({ error: 'Error interno del servidor.' });
      } else if (!row) {
          res.status(404).json({ error: 'Álbum no encontrado.' });
      } else {
          res.json(row);
      }
  });
});


module.exports = router; // Exporta el router para ser usado en server.js




