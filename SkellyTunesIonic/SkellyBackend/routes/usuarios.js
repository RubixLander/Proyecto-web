const express = require('express');
const router = express.Router();
const db = require('../db'); // Importar la conexión a la base de datos

// Ruta para obtener los datos del usuario
router.get('/datosbarra', (req, res) => {
  const { userTag } = req.query;
  // Decodificar el userTag
  const decodedUserTag = decodeURIComponent(userTag);
  console.log('userTag decodificado:', decodedUserTag);  // Verifica que el valor sea correcto

  if (!decodedUserTag) {
    return res.status(400).json({ error: 'El campo "userTag" es obligatorio.' });
  }

  // Consulta SQL para obtener los datos requeridos
  const sql = `
    SELECT 
      p.avatar, 
      u.nombre, 
      u.tag 
    FROM 
      perfiles p
    INNER JOIN 
      usuarios u 
    ON 
      p.tag = u.tag
    WHERE 
      u.tag = ?;
  `;

  // Ejecutar la consulta
  db.get(sql, [decodedUserTag], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Error al consultar la base de datos.' });
    }

    if (!row) {
      return res.status(404).json({ error: 'No se encontró un usuario con ese tag.' });
    }

    // Enviar los datos del usuario como respuesta
    res.status(200).json({
      avatar: row.avatar,
      nombre: row.nombre,
      tag: row.tag,
    });
  });
});

module.exports = router;
