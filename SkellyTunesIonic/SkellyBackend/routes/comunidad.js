// routes/comunidad.js
const express = require('express');
const router = express.Router();
const db = require('../db');  // Conexión a la base de datos

// Ruta para obtener TODAS LAS COMUNIDADES en elementos simples
router.get('/comunidades', (req, res) => {
    // Consulta SQL para obtener id, nombre, background y avatar de las comunidades
    const query = `
        SELECT c.id, c.nombre, c.background, c.avatar
        FROM comunidades c;
    `;

    // Ejecutamos la consulta en la base de datos
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error al obtener las comunidades:', err);
            return res.status(500).json({ message: 'Error al obtener las comunidades' });
        }

        // Devolvemos las comunidades en formato JSON
        res.status(200).json(rows);
    });
});

// Ruta para obtener las comunidades a las que pertenece un usuario
router.get('/usuario/:tag', (req, res) => {
    // Extraemos el tag del usuario desde los parámetros de la URL
    const userTag = req.params.tag;
    
    if (!userTag) {
        return res.status(400).json({ error: 'Tag de usuario no proporcionado' });
    }

    // Decodificamos el tag
    const decodedTag = decodeURIComponent(userTag);

    // Consulta SQL para obtener las comunidades a las que pertenece el usuario
    const query = `
        SELECT c.id, c.nombre, c.background, c.avatar
        FROM comunidades c
        JOIN miembroscomunidad m ON c.id = m.comunidad_id
        WHERE m.usuario_tag = ?;
    `;

    db.all(query, [decodedTag], (err, rows) => {
        if (err) {
            console.error('Error al obtener las comunidades del usuario:', err);
            return res.status(500).json({ message: 'Error al obtener las comunidades del usuario' });
        }

        // Devolvemos las comunidades a las que pertenece el usuario
        res.status(200).json(rows);
    });
});



// Obtener el perfil de una comunidad
router.get('/obtener/:id', async (req, res) => {
    const { id } = req.params; // Obtiene el ID de la comunidad desde los parámetros de la URL
  
    try {
      // Consulta SQL para obtener la información de la comunidad
      const query = `
        SELECT c.id, c.nombre, c.creador, c.avatar, c.headerText, c.background, c.informacion
        FROM comunidades c
        WHERE c.id = ?;
      `;
  
      // Ejecutar la consulta usando db.get para obtener un único resultado
      db.get(query, [id], (err, comunidad) => {
        if (err) {
          console.error('Error al ejecutar la consulta:', err);
          return res.status(500).json({ message: 'Error al obtener el perfil de la comunidad' });
        }
  
        if (comunidad) {
          console.log(`Datos de la comunidad con ID ${id} enviados`); // Log para verificar que la consulta se ejecutó correctamente
          return res.json({
            id: comunidad.id,
            nombre: comunidad.nombre,
            creador: comunidad.creador,
            avatar: comunidad.avatar,
            headerText: comunidad.headerText,
            background: comunidad.background,
            informacion: comunidad.informacion
          });
        } else {
          return res.status(404).json({ message: 'Comunidad no encontrada' });
        }
      });
    } catch (error) {
      console.error('Error interno del servidor:', error);
      return res.status(500).json({ message: 'Error al obtener el perfil de la comunidad' });
    }
  });
  
// Ruta para obtener las discusiones de una comunidad, incluyendo el creador
router.get('/comunidad/:id/discusiones', (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'ID de comunidad no proporcionado' });
    }

    // Consulta SQL para obtener las discusiones de una comunidad, incluyendo el tag del creador
    const query = `
        SELECT d.id, d.titulo, d.detalle, d.fecha, d.creador AS creador_tag, u.nombre AS creador_nombre, u.avatar AS creador_avatar
        FROM discusiones d
        JOIN usuarios u ON d.creador = u.tag
        WHERE d.comunidad = ?;
    `;

    db.all(query, [id], (err, rows) => {
        if (err) {
            console.error('Error al obtener las discusiones de la comunidad:', err);
            return res.status(500).json({ message: 'Error al obtener las discusiones de la comunidad' });
        }

        // Devolvemos las discusiones con los detalles del creador
        res.status(200).json(rows);
    });
});



module.exports = router;