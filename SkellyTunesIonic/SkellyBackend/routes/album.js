router.get('/albumsUsuario/:tag', async (req, res) => {
  const { tag } = req.params;
  const decodedTag = decodeURIComponent(tag);
  console.log('Tag de albumes:', decodedTag);

  try {
      // Obtener los álbumes del usuario (de los que es creador) junto con las canciones
      const queryAlbums = `
          SELECT a.id AS album_id, a.coverart, a.titulo AS album_titulo, a.año, 
                 u.nombre AS artista_nombre, u.tag AS artista_tag,
                 c.id AS cancion_id, c.track, c.titulo AS cancion_titulo, c.duracion, c.archivo_path
          FROM albums a
          JOIN albumartista aa ON a.id = aa.album_id
          JOIN usuarios u ON aa.usuario_tag = u.tag
          LEFT JOIN canciones c ON c.album = a.id  -- Hacemos el JOIN con canciones
          WHERE aa.usuario_tag = ?;  -- Solo los álbumes del usuario especificado
      `;

      db.all(queryAlbums, [tag], (err, albums) => {
          if (err) {
              console.error(err);
              return res.status(500).json({ message: 'Error al obtener los álbumes y canciones' });
          }

          // Si no hay álbumes, devolver un array vacío
          if (!albums || albums.length === 0) {
              return res.status(404).json({ message: 'No se encontraron álbumes para este usuario' });
          }

          // Organizar los resultados por álbumes y asociar canciones a su álbum correspondiente
          const albumsWithSongs = albums.reduce((acc, album) => {
              const albumId = album.album_id;
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

          // Enviar la respuesta con los álbumes y sus canciones
          return res.json({
              albums: Object.values(albumsWithSongs)
          });
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al obtener los álbumes y canciones' });
  }
});
