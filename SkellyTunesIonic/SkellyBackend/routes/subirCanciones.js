// routes/subirCanciones.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../db'); // Conexión a la base de datos
const router = express.Router();

// Configuración de multer para subir archivos de música
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');  // Carpeta donde se almacenarán los archivos
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);  // Obtener la extensión
        cb(null, Date.now() + ext);  // Guardamos el archivo con un nombre único
    }
});

const upload = multer({ storage: storage });

// Ruta para subir canciones a un álbum
router.post('/subirCanciones/:albumId', upload.array('musica', 50), (req, res) => {
    const albumId = req.params.albumId;  // ID del álbum al que se agregan las canciones
    const archivosMusica = req.files || [];

    // Verificar que recibimos canciones
    if (archivosMusica.length === 0) {
        return res.status(400).json({ message: 'No se han subido canciones' });
    }

    // Iterar sobre los archivos de música y agregar cada uno a la base de datos
    archivosMusica.forEach((file, index) => {
        const { titulo, duracion } = req.body;  // Título y duración de la canción

        if (!titulo || !duracion) {
            return res.status(400).json({ message: 'Faltan datos de la canción' });
        }

        // Insertar la canción en la tabla 'canciones'
        const queryCancion = `INSERT INTO canciones (track, titulo, duracion, album) VALUES (?, ?, ?, ?)`;
        db.run(queryCancion, [index + 1, titulo, duracion, albumId], function (err) {
            if (err) {
                console.error('Error al insertar la canción:', err);
            } else {
                // Canción agregada con éxito
            }
        });
    });

    // Responder con éxito
    res.status(200).json({ message: 'Canciones subidas exitosamente', albumId });
});

module.exports = router;
