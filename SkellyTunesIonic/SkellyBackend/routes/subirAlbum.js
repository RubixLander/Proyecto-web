// routes/subirAlbum.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../db'); // Conexión a la base de datos
const router = express.Router();


// Configuración de multer para subir archivos
const storage = multer.diskStorage({
    // Destino de los archivos
    destination: function (req, file, cb) {
        if (file.fieldname === 'coverart') {
            cb(null, './uploads/albums');  // Portadas se suben a 'uploads/albums'
        } else {
            cb(new Error('Archivo no permitido'), false);  // Si no es portada, no se permite
        }
    },
    // Nombre del archivo
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);  // Obtener la extensión del archivo
        cb(null, Date.now() + ext);  // Nombre único para evitar sobrescribir
    }
});

const upload = multer({ storage: storage });

// Ruta para subir un álbum
router.post('/subirAlbum', upload.single('coverart'), (req, res) => {
    const { titulo, año, usuario_tag } = req.body;  // Datos del álbum
    const coverart = req.file ? req.file.path : null;  // Ruta de la portada

    // Verificación de datos necesarios
    if (!titulo || !año || !usuario_tag) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    // Insertar el álbum en la base de datos
    const queryAlbum = `INSERT INTO albums (coverart, titulo, año) VALUES (?, ?, ?)`;
    db.run(queryAlbum, [coverart, titulo, año], function (err) {
        if (err) {
            console.error('Error al insertar el álbum:', err);
            return res.status(500).json({ message: 'Error al insertar el álbum' });
        }

        const albumId = this.lastID;  // Obtener el ID del álbum recién insertado

        // Relacionar el álbum con el artista (usuario_tag)
        const queryAlbumArtista = `INSERT INTO albumartista (usuario_tag, album_id) VALUES (?, ?)`;
        db.run(queryAlbumArtista, [usuario_tag, albumId], function (err) {
            if (err) {
                console.error('Error al asociar el álbum con el artista:', err);
                return res.status(500).json({ message: 'Error al asociar el álbum con el artista' });
            }

            // Responder con éxito
            res.status(200).json({ message: 'Álbum subido exitosamente', albumId });
        });
    });
});

module.exports = router;
