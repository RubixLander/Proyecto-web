"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// config/skellybase.ts
const sequelize_1 = require("sequelize");
// Configuración de la base de datos SQLite
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE || './Skelly_DB/Skellytunes.bd', // Usar variable de entorno
});
// Verificar la conexión
sequelize.authenticate()
    .then(() => {
    console.log('Conexión a la base de datos establecida correctamente');
})
    .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
});
// Exportar sequelize para su uso en otros archivos
exports.default = sequelize;
