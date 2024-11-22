const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../db'); // Conexión a la base de datos
const jwt = require('jsonwebtoken'); // Necesitamos este paquete para verificar el JWT
require('dotenv').config();  // Cargar las variables del archivo .env

const router = express.Router();
const secretKey = process.env.SECRET_KEY;

// Middleware para verificar y decodificar el token
const verificarToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token no válido' });
        }

        // Guardamos el tag del usuario en la solicitud para usarlo en la siguiente etapa
        req.userTag = decoded.tag;
        next(); // Continuamos con la siguiente función en la pila
    });
};

// Configuración de multer para subir archivos de música
const storage = multer.diskStorage({
    // Destino de los archivos
    destination: function (req, file, cb) {
        if (file.fieldname === 'musica') {
            cb(null, './uploads/canciones');  // Las canciones se suben a 'uploads/canciones'
        } else {
            cb(new Error('Archivo no permitido'), false);  // Si el archivo no es música, no se permite
        }
    },
    // Nombre del archivo
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);  // Obtener la extensión del archivo
        cb(null, Date.now() + ext);  // Nombre único para evitar sobrescribir
    }
});

const upload = multer({ storage: storage });

// Ruta para subir canciones a un álbum
router.post('/subirCanciones/:albumId', verificarToken, upload.array('musica', 50), (req, res) => {
    const albumId = req.params.albumId;  // ID del álbum al que se agregan las canciones
    const archivosMusica = req.files || [];

    // Verificar que se han subido canciones
    if (archivosMusica.length === 0) {
        return res.status(400).json({ message: 'No se han subido canciones' });
    }

    // Verificar si el usuario tiene permisos para subir canciones al álbum
    db.get('SELECT creador FROM albums WHERE id = ?', [albumId], (err, album) => {
        if (err) {
            console.error('Error al verificar el álbum:', err);
            return res.status(500).json({ message: 'Error al verificar el álbum' });
        }

        if (!album) {
            return res.status(404).json({ message: 'Álbum no encontrado' });
        }

        // Verificar que el usuario autenticado es el creador del álbum
        if (req.userTag !== album.creador) {
            return res.status(403).json({ message: 'No tienes permisos para subir canciones a este álbum' });
        }

        // Si el usuario tiene permisos, continuar subiendo las canciones
        archivosMusica.forEach((file, index) => {
            const { titulo, duracion } = req.body;  // Obtener título y duración de la canción

            if (!titulo || !duracion) {
                return res.status(400).json({ message: 'Faltan datos de la canción' });
            }

            // Obtener la ruta del archivo de la canción
            const archivoPath = file.path;

            // Insertar la canción en la base de datos con la ruta del archivo
            const queryCancion = `INSERT INTO canciones (track, titulo, duracion, album, archivo_path) VALUES (?, ?, ?, ?, ?)`;
            db.run(queryCancion, [index + 1, titulo, duracion, albumId, archivoPath], function (err) {
                if (err) {
                    console.error('Error al insertar la canción:', err);
                }
            });
        });

        // Responder con éxito
        res.status(200).json({ message: 'Canciones subidas exitosamente', albumId });
    });
});

module.exports = router;
