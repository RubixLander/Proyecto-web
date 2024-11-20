"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Extiende de Model para tipos más seguros
class Comunidad extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    // Inicializar el modelo con sequelize
    Comunidad.init({
        id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        creador: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    }, {
        sequelize, // Pasa la instancia de sequelize
        modelName: 'Comunidad', // Nombre del modelo
        tableName: 'comunidades', // Nombre de la tabla
        timestamps: false, // No se utilizan los campos CreatedAt y UpdatedAt
    });
    return Comunidad;
};
