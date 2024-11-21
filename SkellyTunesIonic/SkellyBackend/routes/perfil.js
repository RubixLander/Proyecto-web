const express = require('express');
const router = express.Router();
const db = require('../db'); // Tu conexión a la base de datos
const jwt = require('jsonwebtoken');

// Usar la SECRET_KEY desde el archivo .env
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware para verificar el token JWT
function verificarToken(req, res, next) {
    console.log('Token recibido:', req.header('Authorization')); // Verifica qué contiene la cabecera
    
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) return res.status(403).json({ message: 'Token no proporcionado' });
  
    try {
      // Intentamos verificar el token usando la clave secreta
      const decoded = jwt.verify(token, SECRET_KEY);  // Usamos la clave secreta del archivo .env
      req.user = decoded;  // Guardamos los datos decodificados del usuario
      next();  // Si el token es válido, continuamos con la solicitud
    } catch (error) {
      // Verificamos el tipo de error
      if (error.name === 'JsonWebTokenError') {
        // Si el error es por una firma inválida
        console.error('Firma inválida:', error.message);
        return res.status(401).json({ message: 'Token inválido (firma incorrecta)' });
      }
      
      if (error.name === 'TokenExpiredError') {
        // Si el error es por un token expirado
        console.error('Token expirado:', error.message);
        return res.status(401).json({ message: 'Token expirado' });
      }
  
      // En caso de otro tipo de error desconocido
      return res.status(500).json({ message: 'Error al verificar el token' });
    }
  }

// Obtener el perfil del usuario
router.get('/obtener/:tag', async (req, res) => {
    const { tag } = req.params;
    const decodedTag = decodeURIComponent(tag);
    console.log('Tag Recibido:', decodedTag);  // Verifica que el valor sea correcto
  
    try {
      const query = `
        SELECT u.nombre, u.contraseña, p.avatar, p.headerText, p.background, p.informacion
        FROM usuarios u
        JOIN perfiles p ON u.tag = p.tag
        WHERE u.tag = ?;
      `;
  
      // Ejecutar la consulta usando db.get para obtener un solo resultado
      db.get(query, [tag], (err, user) => {
        if (err) {
          console.error('Error al ejecutar la consulta:', err);
          return res.status(500).json({ message: 'Error al obtener el perfil del usuario' });
        }
  
        if (user) {
          console.log(`Datos del perfil del usuario con tag ${decodedTag} enviados`);  // Mensaje en consola
          return res.json({
            nombre: user.nombre,
            avatar: user.avatar,
            headerText: user.headerText,
            background: user.background,
            informacion: user.informacion
          });
        } else {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al obtener el perfil del usuario' });
    }
  });
  

// Modificar el perfil del usuario
router.put('/modificar/:tag', verificarToken, async (req, res) => {
    const { tag } = req.params;
    const { nombre, avatar, headerText, background, informacion } = req.body;

    const decodedTag = decodeURIComponent(tag);
    console.log('Tag Recibido para perfil:', decodedTag);  // Verifica que el valor sea correcto

    // Verificar que el usuario autenticado tiene permiso para modificar este perfil
    if (req.user.tag !== decodedTag) {
        return res.status(403).json({ message: 'No tienes permiso para modificar este perfil' });
    }

    try {
        // Actualizar la tabla de usuarios
        const queryUsuario = `UPDATE usuarios SET nombre = ? WHERE tag = ?;`;
        db.run(queryUsuario, [nombre, decodedTag], function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error al actualizar el nombre del usuario' });
            }
        });

        // Actualizar la tabla de perfiles
        const queryPerfil = `UPDATE perfiles SET avatar = ?, headerText = ?, background = ?, informacion = ? WHERE tag = ?;`;
        db.run(queryPerfil, [avatar, headerText, background, informacion, decodedTag], function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error al actualizar el perfil' });
            }
        });

        console.log(`perfil actualizado de tag: ${decodedTag}`);
        return res.json({ message: 'Perfil actualizado con éxito' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar el perfil' });
    }
});


module.exports = router;
