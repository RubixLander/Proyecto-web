const express = require('express');
const router = express.Router();
const db = require('../db'); // Importar la conexión a la base de datos
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Usar la SECRET_KEY desde el archivo .env
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware para verificar el token JWT
function verificarToken(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(403).json({ message: 'Token no proporcionado' });

  try {
      const decoded = jwt.verify(token, SECRET_KEY);  // Usamos la clave secreta del archivo .env
      req.user = decoded;  // Guardamos los datos decodificados del usuario
      next();
  } catch (error) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

// Ruta para obtener los datos del usuario (sin contraseña)
router.get('/datosbarra', (req, res) => {
  const { userTag } = req.query;
  // Decodificar el userTag
  const decodedUserTag = decodeURIComponent(userTag);
  //console.log('Tag Recibido:', decodedUserTag);  // Verifica que el valor sea correcto

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

    //console.log('Se han enviado los datos de barra');
    // Enviar los datos del usuario como respuesta
    res.status(200).json({
      avatar: row.avatar,
      nombre: row.nombre,
      tag: row.tag,
    });
  });
});

// Ruta para modificar la contraseña
router.put('/modificar-contraseña/:tag', verificarToken, async (req, res) => {
  const { tag } = req.params; // Se obtiene el tag del usuario desde los parámetros de la URL
  const { nuevaContraseña } = req.body; // Se obtiene la nueva contraseña desde el cuerpo de la solicitud

  const decodedtag = decodeURIComponent(tag);
  console.log('Tag Recibido:', decodedtag);  // Verifica que el valor sea correcto

  if (!nuevaContraseña) {
      return res.status(400).json({ error: 'La nueva contraseña es obligatoria.' });
  }

  try {
      // Verificar si el usuario del token tiene permiso para modificar esta contraseña
      if (req.user.tag !== decodedtag) {
          return res.status(403).json({ error: 'No tienes permiso para modificar esta contraseña.' });
      }

      // Hashear la nueva contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedNuevaContraseña = await bcrypt.hash(nuevaContraseña, salt);

      // Actualizar la contraseña en la base de datos
      const query = `UPDATE usuarios SET contraseña = ? WHERE tag = ?`;
      await db.query(query, [hashedNuevaContraseña, decodedtag]);

      // Imprimir en consola que la contraseña fue modificada
      console.log(`Se modificó la contraseña del usuario con tag: ${decodedtag}`);

      res.json({ message: 'Contraseña actualizada con éxito.' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al modificar la contraseña.' });
  }
});

module.exports = router;
