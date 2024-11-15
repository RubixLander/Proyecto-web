import cors from 'cors';
import sequelize from './config/skellybase'; // Configuración de la base de datos
import express, { Request, Response } from 'express';  // Importa express y los tipos de Request y Response

// Importar los modelos
import Usuario from './models/Usuario';
import Genero from './models/Genero';
import Cancion from './models/Cancion';
import Album from './models/Album';
import Playlist from './models/Playlist';
import Comentario from './models/Comentario';
import Comunidad from './models/Comunidad';
import Discusion from './models/Discusion';
import Respuesta from './models/Respuesta';
import PlaylistCancion from './models/PlaylisCancion';
import CancionGenero from './models/CancionGenero';
import AlbumGenero from './models/Albumgenero';
import MiembroComunidad from './models/MiembroComunidad';
import AlbumArtista from './models/AlbumArtista';

// Declara e inicializa la aplicación express
const app = express();
const port = 3000;

// Middleware para parsear JSON y habilitar CORS
app.use(express.json());
app.use(cors());  // Asegúrate de haber instalado y configurado correctamente CORS

// Ruta de prueba (debe ir después de la declaración de 'app')
app.get('/api/data', (req: Request, res: Response) => {
  res.json({ message: 'Datos del backend' });
});

// Inicializar los modelos con Sequelize
const models = {
  Usuario: Usuario(sequelize),
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
};

// Establecer las relaciones entre los modelos
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
sequelize.sync({ force: false, alter: true }).then(() => {
  console.log('Base de datos sincronizada y tablas creadas.');

  // Iniciar el servidor solo después de que la base de datos esté sincronizada
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}).catch(error => {
  console.error('Error al sincronizar la base de datos:', error);
});