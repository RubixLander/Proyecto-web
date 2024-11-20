"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Extiende de Model para tipos más seguros
class PlaylistCancion extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    // Inicializar el modelo con sequelize
    PlaylistCancion.init({
        playlist_id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true },
        cancion_id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true },
    }, {
        sequelize, // Pasa la instancia de sequelize
        modelName: 'PlaylistCancion', // Nombre del modelo
        tableName: 'playlist_canciones', // Nombre de la tabla
        timestamps: false, // No se gestionan los campos CreatedAt y UpdatedAt
    });
    return PlaylistCancion;
};
