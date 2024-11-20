"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Extiende de Model para tipos más seguros
class Discusion extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    // Inicializar el modelo con sequelize
    Discusion.init({
        id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        titulo: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        detalle: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
        comunidad: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
        creador: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        fecha: { type: sequelize_1.DataTypes.DATE, allowNull: true },
    }, {
        sequelize, // Pasa la instancia de sequelize
        modelName: 'Discusion', // Nombre del modelo
        tableName: 'discusiones', // Nombre de la tabla
        timestamps: false, // No se utilizan los campos CreatedAt y UpdatedAt
    });
    return Discusion;
};
