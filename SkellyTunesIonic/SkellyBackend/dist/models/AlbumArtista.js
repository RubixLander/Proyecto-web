"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Extiende de Model para tipos más seguros
class AlbumArtista extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    // Inicializar el modelo con sequelize
    AlbumArtista.init({
        usuario_tag: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
        album_id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true },
    }, {
        sequelize, // Pasa la instancia de sequelize
        modelName: 'AlbumArtista', // Nombre del modelo
        tableName: 'album_artistas', // Nombre de la tabla
        timestamps: false, // No se gestionan los campos CreatedAt y UpdatedAt
    });
    return AlbumArtista;
};
