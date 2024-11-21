const express = require('express');
const jwt = require('jsonwebtoken');  // Usamos jsonwebtoken para verificar el token
const router = express.Router();
const db = require('../db');  // Conexión a la base de datos
require('dotenv').config();  // Cargamos las variables del archivo .env (como SECRET_KEY)

// Usamos la SECRET_KEY desde el archivo .env para manejar la verificación del token
const secretKey = process.env.SECRET_KEY;

// Ruta para obtener todas las comunidades
router.get('/comunidades', (req, res) => {
    // Consulta SQL para obtener todas las comunidades
    const query = `
        SELECT c.id, c.nombre, c.creador, c.headerText, u.nombre AS creador_nombre
        FROM comunidades c
        JOIN usuarios u ON c.creador = u.tag;
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

// Ruta para obtener las comunidades a las que pertenece un usuario autenticado
router.get('/usuario/comunidades', (req, res) => {
    // Extraemos el token del encabezado Authorization
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    // Verificamos y decodificamos el token con la clave secreta
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token no válido' });
        }

        // El tag del usuario decodificado
        const userTag = decoded.tag;

        // Consulta SQL para obtener las comunidades a las que pertenece el usuario
        const query = `
            SELECT c.id, c.nombre, c.creador, c.headerText
            FROM comunidades c
            JOIN miembroscomunidad m ON c.id = m.comunidad_id
            WHERE m.usuario_tag = ?;
        `;

        db.all(query, [userTag], (err, rows) => {
            if (err) {
                console.error('Error al obtener las comunidades del usuario:', err);
                return res.status(500).json({ message: 'Error al obtener las comunidades del usuario' });
            }

            // Devolvemos las comunidades a las que pertenece el usuario
            res.status(200).json(rows);
        });
    });
});

module.exports = router;
