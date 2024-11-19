"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Extiende de Model para tipos más seguros
class CancionGenero extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    // Inicializar el modelo con sequelize
    CancionGenero.init({
        cancion_id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true },
        genero_id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true },
    }, {
        sequelize, // Pasa la instancia de sequelize
        modelName: 'CancionGenero', // Nombre del modelo
        tableName: 'cancion_generos', // Nombre de la tabla
        timestamps: false, // No se gestionan los campos CreatedAt y UpdatedAt
    });
    return CancionGenero;
};
