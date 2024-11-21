// routes/subirCanciones.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../db'); // Conexión a la base de datos
const router = express.Router();

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
router.post('/subirCanciones/:albumId', upload.array('musica', 50), (req, res) => {
    const albumId = req.params.albumId;  // ID del álbum al que se agregan las canciones
    const archivosMusica = req.files || [];

    // Verificar que se han subido canciones
    if (archivosMusica.length === 0) {
        return res.status(400).json({ message: 'No se han subido canciones' });
    }

    archivosMusica.forEach((file, index) => {
        const { titulo, duracion } = req.body;  // Obtener título y duración de la canción

        if (!titulo || !duracion) {
            return res.status(400).json({ message: 'Faltan datos de la canción' });
        }

        // Insertar la canción en la base de datos
        const queryCancion = `INSERT INTO canciones (track, titulo, duracion, album) VALUES (?, ?, ?, ?)`;
        db.run(queryCancion, [index + 1, titulo, duracion, albumId], function (err) {
            if (err) {
                console.error('Error al insertar la canción:', err);
            }
        });
    });

    // Responder con éxito
    res.status(200).json({ message: 'Canciones subidas exitosamente', albumId });
});

module.exports = router;
