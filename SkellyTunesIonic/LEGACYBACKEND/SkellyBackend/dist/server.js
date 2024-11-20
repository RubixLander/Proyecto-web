"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /server.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Cargar las variables de entorno del archivo .env
// Importar las rutas
const authRoutes_1 = __importDefault(require("./api/auth/authRoutes")); // Rutas de autenticación
const usuarioRoutes_1 = __importDefault(require("./api/Usuarios/usuarioRoutes")); // Rutas de usuarios
// Importar los modelos y las dependencias necesarias
const cors_1 = __importDefault(require("cors"));
const skellybase_1 = __importDefault(require("./config/skellybase")); // Configuración de la base de datos
const express_1 = __importDefault(require("express")); // Importa express y los tipos de Request y Response
// Importar los modelos
const Usuario_1 = __importDefault(require("./models/Usuario"));
const Genero_1 = __importDefault(require("./models/Genero"));
const Cancion_1 = __importDefault(require("./models/Cancion"));
const Album_1 = __importDefault(require("./models/Album"));
const Playlist_1 = __importDefault(require("./models/Playlist"));
const Comentario_1 = __importDefault(require("./models/Comentario"));
const Comunidad_1 = __importDefault(require("./models/Comunidad"));
const Discusion_1 = __importDefault(require("./models/Discusion"));
const Respuesta_1 = __importDefault(require("./models/Respuesta"));
const PlaylisCancion_1 = __importDefault(require("./models/PlaylisCancion"));
const CancionGenero_1 = __importDefault(require("./models/CancionGenero"));
const AlbumGenero_1 = __importDefault(require("./models/AlbumGenero"));
const MiembroComunidad_1 = __importDefault(require("./models/MiembroComunidad"));
const AlbumArtista_1 = __importDefault(require("./models/AlbumArtista"));
// Inicializar la aplicación express
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware para parsear JSON y habilitar CORS
app.use(express_1.default.json());
app.use((0, cors_1.default)()); // Asegúrate de haber instalado y configurado correctamente CORS
// Usar las rutas de autenticación y usuarios
app.use('/api/auth', authRoutes_1.default);
app.use('/api/usuarios', usuarioRoutes_1.default);
// Ruta de prueba
app.get('/api/data', (req, res) => {
    res.json({ message: 'Datos del backend' });
});
// Inicializar los modelos con Sequelize
const models = {
    Usuario: Usuario_1.default,
    Genero: (0, Genero_1.default)(skellybase_1.default),
    Cancion: (0, Cancion_1.default)(skellybase_1.default),
    Album: (0, Album_1.default)(skellybase_1.default),
    Playlist: (0, Playlist_1.default)(skellybase_1.default),
    Comentario: (0, Comentario_1.default)(skellybase_1.default),
    Comunidad: (0, Comunidad_1.default)(skellybase_1.default),
    Discusion: (0, Discusion_1.default)(skellybase_1.default),
    Respuesta: (0, Respuesta_1.default)(skellybase_1.default),
    PlaylistCancion: (0, PlaylisCancion_1.default)(skellybase_1.default),
    CancionGenero: (0, CancionGenero_1.default)(skellybase_1.default),
    AlbumGenero: (0, AlbumGenero_1.default)(skellybase_1.default),
    MiembroComunidad: (0, MiembroComunidad_1.default)(skellybase_1.default),
    AlbumArtista: (0, AlbumArtista_1.default)(skellybase_1.default),
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
skellybase_1.default.sync({ force: false, alter: true })
    .then(() => {
    console.log('Base de datos sincronizada y tablas creadas.');
    // Iniciar el servidor solo después de que la base de datos esté sincronizada
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
});
