"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Extiende de Model para tipos más seguros
class AlbumGenero extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    // Inicializar el modelo con sequelize
    AlbumGenero.init({
        album_id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true },
        genero_id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true },
    }, {
        sequelize, // Pasa la instancia de sequelize
        modelName: 'AlbumGenero', // Nombre del modelo
        tableName: 'album_generos', // Nombre de la tabla
        timestamps: false, // No se gestionan los campos CreatedAt y UpdatedAt
    });
    return AlbumGenero;
};
