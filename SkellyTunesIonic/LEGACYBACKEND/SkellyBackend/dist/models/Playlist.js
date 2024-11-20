"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Extiende de Model para tener tipos más seguros
class Playlist extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    // Inicializar el modelo con sequelize
    Playlist.init({
        id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        titulo: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        detalle: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        creador: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        CreatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: true },
        UpdatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: true },
    }, {
        sequelize, // Pasa la instancia de sequelize
        modelName: 'Playlist', // Nombre del modelo
        tableName: 'playlists', // Nombre de la tabla
        timestamps: true, // Habilita los campos CreatedAt y UpdatedAt
        createdAt: 'CreatedAt', // Nombre explícito del campo CreatedAt
        updatedAt: 'UpdatedAt', // Nombre explícito del campo UpdatedAt
    });
    return Playlist;
};
