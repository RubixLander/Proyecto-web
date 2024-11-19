"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Extiende de Model para tipos más seguros
class Comentario extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    // Inicializar el modelo con sequelize
    Comentario.init({
        id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        comentario: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        usuario: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        cancion: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
        CreatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: true },
        UpdatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: true },
    }, {
        sequelize, // Pasa la instancia de sequelize
        modelName: 'Comentario', // Nombre del modelo
        tableName: 'comentarios', // Nombre de la tabla
        timestamps: true, // Habilita los campos CreatedAt y UpdatedAt
        createdAt: 'CreatedAt', // Nombre explícito del campo CreatedAt
        updatedAt: 'UpdatedAt', // Nombre explícito del campo UpdatedAt
    });
    return Comentario;
};
