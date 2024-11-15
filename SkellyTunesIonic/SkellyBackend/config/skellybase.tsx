import { Sequelize } from 'sequelize';

// Configuración de la base de datos SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './Skelly_DB/Skellytunes.bd', // Asegúrate de que la ruta esté correcta
});

// Verificar la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente');
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
  });

// Sincronizar la base de datos sin eliminar tablas existentes
sequelize.sync()  // Sin la opción { force: true }, no se eliminarán las tablas
  .then(() => {
    console.log('Base de datos sincronizada y tablas creadas si no existían.');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

// Exportar sequelize como módulo
export default sequelize;
