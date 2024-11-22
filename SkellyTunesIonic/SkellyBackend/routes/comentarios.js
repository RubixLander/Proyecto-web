// routes/comentarios.js
const express = require('express');
const db = require('../db');  // Conexión a la base de datos
const jwt = require('jsonwebtoken'); // Importamos la librería para trabajar con JWT
const router = express.Router();

// Middleware para verificar que el usuario está autenticado
const verificarToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Obtener el token del encabezado

    if (!token) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    try {
        // Verificamos y decodificamos el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // `JWT_SECRET` es la clave secreta de tu aplicación
        req.userTag = decoded.tag;  // Suponiendo que el tag está almacenado en el token
        next();
    } catch (err) {
        console.error('Error al verificar el token:', err);
        return res.status(401).json({ error: 'Token inválido' });
    }
};

// Ruta para insertar un comentario en una canción
router.post('/comentarios/:cancionId', verificarToken, (req, res) => {
    const { comentario } = req.body;  // El comentario que viene en el cuerpo de la solicitud
    const cancionId = req.params.cancionId;  // ID de la canción que se está comentando
    const usuarioTag = req.userTag;  // Tag del usuario que comenta (obtenido del token)

    // Verificamos que el comentario no esté vacío
    if (!comentario) {
        return res.status(400).json({ message: 'El comentario no puede estar vacío' });
    }

    // Consulta para obtener el avatar del usuario
    const queryAvatar = `SELECT avatar FROM perfiles WHERE tag = ?`;
    db.get(queryAvatar, [usuarioTag], (err, row) => {
        if (err) {
            console.error('Error al obtener el avatar:', err);
            return res.status(500).json({ message: 'Error al obtener el avatar del usuario' });
        }

        if (!row) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const avatar = row.avatar;  // Avatar del usuario que comenta

        // Insertar el comentario en la tabla comentarios
        const queryComentario = `INSERT INTO comentarios (comentario, usuario, cancion, avatar) 
                                 VALUES (?, ?, ?, ?)`;
        db.run(queryComentario, [comentario, usuarioTag, cancionId, avatar], function (err) {
            if (err) {
                console.error('Error al insertar el comentario:', err);
                return res.status(500).json({ message: 'Error al insertar el comentario' });
            }

            res.status(201).json({
                message: 'Comentario insertado correctamente',
                comentarioId: this.lastID
            });
        });
    });
});

// Ruta para obtener todos los comentarios de una canción
router.get('/comentarios/:cancionId', (req, res) => {
    const cancionId = req.params.cancionId;  // ID de la canción

    // Consulta SQL para obtener todos los comentarios de una canción, con el tag y avatar del usuario
    const query = `
        SELECT 
            c.id AS comentario_id,
            c.comentario,
            c.createdat,
            c.updatedat,
            u.tag AS usuario_tag,
            p.avatar AS usuario_avatar
        FROM comentarios c
        JOIN usuarios u ON c.usuario = u.tag
        JOIN perfiles p ON u.tag = p.tag
        WHERE c.cancion = ?
        ORDER BY c.createdat DESC;
    `;

    // Ejecutamos la consulta
    db.all(query, [cancionId], (err, rows) => {
        if (err) {
            console.error('Error al obtener los comentarios:', err);
            return res.status(500).json({ message: 'Error al obtener los comentarios' });
        }

        // Si no hay comentarios para esa canción
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No hay comentarios para esta canción' });
        }

        // Devolvemos los comentarios con la información solicitada
        res.status(200).json({
            comentarios: rows
        });
    });
});

module.exports = router;