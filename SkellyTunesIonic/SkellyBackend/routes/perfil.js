const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../db'); // Tu conexión a la base de datos

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

// Aquí continúan los endpoints como los de obtener y modificar perfil...


// Obtener el perfil del usuario
router.get('/perfil/:tag', async (req, res) => {
    const { tag } = req.params;

    try {
        const query = `
            SELECT u.nombre, u.contraseña, p.avatar, p.headerText, p.background, p.informacion
            FROM usuarios u
            JOIN perfiles p ON u.tag = p.tag
            WHERE u.tag = ?;
        `;
        const [user] = await db.query(query, [tag]);

        if (user) {
            return res.json({
                nombre: user.nombre,
                contraseña: user.contraseña,  // Normalmente no devolverías la contraseña en la respuesta
                avatar: user.avatar,
                headerText: user.headerText,
                background: user.background,
                informacion: user.informacion
            });
        } else {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener el perfil del usuario' });
    }
});

// Modificar el perfil del usuario
router.put('/perfil/:tag', verificarToken, async (req, res) => {
    const { tag } = req.params;
    const { nombre, contraseña, avatar, headerText, background, informacion } = req.body;

    if (req.user.tag !== tag) {
        return res.status(403).json({ message: 'No tienes permiso para modificar este perfil' });
    }

    try {
        let nuevaContraseña = contraseña;
        if (contraseña) {
            const salt = await bcrypt.genSalt(10);
            nuevaContraseña = await bcrypt.hash(contraseña, salt);
        }

        const queryUsuario = `
            UPDATE usuarios
            SET nombre = ?, contraseña = ?
            WHERE tag = ?;
        `;
        await db.query(queryUsuario, [nombre, nuevaContraseña, tag]);

        const queryPerfil = `
            UPDATE perfiles
            SET avatar = ?, headerText = ?, background = ?, informacion = ?
            WHERE tag = ?;
        `;
        await db.query(queryPerfil, [avatar, headerText, background, informacion, tag]);

        return res.json({ message: 'Perfil actualizado con éxito' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar el perfil' });
    }
});

module.exports = router;
