require('dotenv').config(); //variables de entorno.
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/autentificacion'); // Importar las rutas
const perfil = require('./routes/perfil');
const buscar = require('./routes/buscar');
const biblioteca = require('./routes/biblioteca');
const userRoutes = require('./routes/usuario'); // Importar las rutas
const album = require('./routes/album');
const artistas = require('./routes/artista');
const comunidades = require('./routes/comunidad');
const subirAlbum = require('./routes/subirAlbum');
const subirCanciones = require('./routes/subirCanciones');
const playlist = require('./routes/playlist');
const comentarios = require('./routes/comentarios');
const playlistCanciones = require('./routes/playlistCanciones');

const app = express();
const port = process.env.PORT;


// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/autentificacion', authRoutes); // Usar las rutas de usuarios
app.use('/api/perfil', perfil);
app.use('/api/buscar', buscar);
app.use('/api/biblioteca', biblioteca);
app.use('/api/usuario', userRoutes);
app.use('/api/album', album);
app.use('/api/artistas', artistas);
app.use('/api/comunidad', comunidades); 
app.use('/api/subirAlbum', subirAlbum);
app.use('/api/subirCanciones', subirCanciones);
app.use('/api/playlist', playlist);
app.use('/api/comentarios', comentarios);
app.use('./api/playlistCanciones', playlistCanciones);
//Usar esta estructura de arriba xd

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});