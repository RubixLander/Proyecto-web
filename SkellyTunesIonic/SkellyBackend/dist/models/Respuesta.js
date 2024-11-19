"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Extiende de Model para tipos más seguros
class Respuesta extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    // Inicializar el modelo con sequelize
    Respuesta.init({
        id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        creador: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        discussion: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
        detalle: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        fecha: { type: sequelize_1.DataTypes.DATE, allowNull: true },
        reply: { type: sequelize_1.DataTypes.INTEGER, allowNull: true }, // Puede ser null
    }, {
        sequelize, // Pasa la instancia de sequelize
        modelName: 'Respuesta', // Nombre del modelo
        tableName: 'respuestas', // Nombre de la tabla
        timestamps: false, // No se utilizan los campos CreatedAt y UpdatedAt
    });
    return Respuesta;
};
