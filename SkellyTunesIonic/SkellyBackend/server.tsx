import "./types/express.d";
import dotenv from 'dotenv';
dotenv.config(); // Cargar las variables de entorno desde el archivo .env

// Importar dependencias y rutas
import authRoutes from './api/routes/authRoutes'; // Rutas de autenticación
import usuarioRoutes from './api/routes/usuarioRouter'; // Rutas de usuarios
import cors from 'cors';
import express, { Request, Response } from 'express'; // Importa express y los tipos de Request y Response
import sequelize from './config/skellybase'; // Configuración de la base de datos
import bcrypt from 'bcryptjs';

// Importar los modelos
import Usuario from './api/models/Usuario'; // Modelo de Usuario
import Genero from './api/models/Genero';
import Cancion from './api/models/Cancion';
import Album from './api/models/Album';
import Playlist from './api/models/Playlist';
import Comentario from './api/models/Comentario';
import Comunidad from './api/models/Comunidad';
import Discusion from './api/models/Discusion';
import Respuesta from './api/models/Respuesta';
import PlaylistCancion from './api/models/PlaylisCancion';
import CancionGenero from './api/models/CancionGenero';
import AlbumGenero from './api/models/AlbumGenero';
import MiembroComunidad from './api/models/MiembroComunidad';
import AlbumArtista from './api/models/AlbumArtista';
import Perfil from './api/models/Perfiles'; 
import SeguidosUsuarios from './api/models/SeguidosUsuarios'; 
import seguidoresRoutes from './api/routes/seguidoresRoutes';

async function crearAdminSiNoExiste() {
  try {
    // Verificar si el usuario admin ya existe
    const usuarioExistente = await Usuario.findByPk('admin');
    if (usuarioExistente) {
      console.log('El usuario admin ya existe');
      return;
    }

    const contrasenaAdmin = process.env.ADMIN_PASSWORD;
    const correoAdmin = process.env.ADMIN_EMAIL;  // Asegúrate de tener esta variable en .env
    if (!contrasenaAdmin || !correoAdmin) {
      console.error('No se ha configurado la contraseña o correo del administrador en el archivo .env');
      return;
    }

    // Cifrar la contraseña del administrador
    const contrasenaCifrada = await bcrypt.hash(contrasenaAdmin, 10);

    // Crear el nuevo usuario admin con el correo
    const nuevoAdmin = await Usuario.create({
      tag: 'admin',
      nombre: 'Administrador',
      contrasena: contrasenaCifrada,
      rol: 'admin',
      correo: correoAdmin,  // Aquí agregamos el correo
    });

    console.log('Usuario admin creado exitosamente:', nuevoAdmin);
  } catch (error) {
    console.error('Error al crear el usuario admin:', error);
  }
}


// Inicializar la aplicación express
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// Usar las rutas de autenticación y usuarios
app.use('/api/routes', authRoutes);
app.use('/api/routes', usuarioRoutes);
app.use('/api/routes', seguidoresRoutes);

// Inicializar los modelos con Sequelize
const models = {
  Usuario,
  Genero: Genero(sequelize),
  Cancion: Cancion(sequelize),
  Album: Album(sequelize),
  Playlist: Playlist(sequelize),
  Comentario: Comentario(sequelize),
  Comunidad: Comunidad(sequelize),
  Discusion: Discusion(sequelize),
  Respuesta: Respuesta(sequelize),
  PlaylistCancion: PlaylistCancion(sequelize),
  CancionGenero: CancionGenero(sequelize),
  AlbumGenero: AlbumGenero(sequelize),
  MiembroComunidad: MiembroComunidad(sequelize),
  AlbumArtista: AlbumArtista(sequelize),
  Perfil: Perfil, // Inicialización del modelo Perfil
  SeguidosUsuarios: SeguidosUsuarios, // Inicialización del modelo SeguidosUsuarios
};

// Establecer las relaciones entre los modelos
models.Usuario.hasOne(models.Perfil, { foreignKey: 'tag' });
models.Perfil.belongsTo(models.Usuario, { foreignKey: 'tag' });

models.Usuario.hasMany(models.Comentario, { foreignKey: 'usuario' });
models.Comentario.belongsTo(models.Usuario, { foreignKey: 'usuario' });

models.Cancion.hasMany(models.Comentario, { foreignKey: 'cancion' });
models.Comentario.belongsTo(models.Cancion, { foreignKey: 'cancion' });

models.Playlist.belongsToMany(models.Cancion, { through: models.PlaylistCancion });
models.Cancion.belongsToMany(models.Playlist, { through: models.PlaylistCancion });

models.Cancion.belongsToMany(models.Genero, { through: models.CancionGenero });
models.Genero.belongsToMany(models.Cancion, { through: models.CancionGenero });

models.Album.belongsToMany(models.Genero, { through: models.AlbumGenero });
models.Genero.belongsToMany(models.Album, { through: models.AlbumGenero });

models.Usuario.belongsToMany(models.Comunidad, { through: models.MiembroComunidad });
models.Comunidad.belongsToMany(models.Usuario, { through: models.MiembroComunidad });

models.Album.belongsToMany(models.Usuario, { through: models.AlbumArtista });
models.Usuario.belongsToMany(models.Album, { through: models.AlbumArtista });

models.Comunidad.hasMany(models.Discusion, { foreignKey: 'comunidad' });
models.Discusion.belongsTo(models.Comunidad, { foreignKey: 'comunidad' });

models.Discusion.hasMany(models.Respuesta, { foreignKey: 'discussion' });
models.Respuesta.belongsTo(models.Discusion, { foreignKey: 'discussion' });

models.Usuario.hasMany(models.Respuesta, { foreignKey: 'creador' });
models.Respuesta.belongsTo(models.Usuario, { foreignKey: 'creador' });

// Sincronizar la base de datos y arrancar el servidor solo después de que la base de datos esté sincronizada
sequelize.sync({ force: false, alter: true })
  .then(() => {
    console.log('Base de datos sincronizada y tablas creadas.');

    crearAdminSiNoExiste();

    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });
