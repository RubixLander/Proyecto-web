"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Extiende de Model para tipos más seguros
class MiembroComunidad extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    // Inicializar el modelo con sequelize
    MiembroComunidad.init({
        usuario_tag: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
        comunidad_id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true },
    }, {
        sequelize, // Pasa la instancia de sequelize
        modelName: 'MiembroComunidad', // Nombre del modelo
        tableName: 'miembro_comunidades', // Nombre de la tabla
        timestamps: false, // No se gestionan los campos CreatedAt y UpdatedAt
    });
    return MiembroComunidad;
};
