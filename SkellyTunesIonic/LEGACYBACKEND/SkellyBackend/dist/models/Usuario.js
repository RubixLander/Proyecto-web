"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Usuario.ts
const sequelize_1 = require("sequelize");
const skellybase_1 = __importDefault(require("../config/skellybase")); // Asegúrate de que la conexión a la DB esté configurada correctamente
class Usuario extends sequelize_1.Model {
}
// Inicializa el modelo de Usuario con la conexión a Sequelize
Usuario.init({
    tag: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    contrasena: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    rol: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: 'user', // Por defecto, el rol es 'user'
    },
}, {
    sequelize: skellybase_1.default, // La instancia de sequelize para conectar
    modelName: 'Usuario',
    tableName: 'usuarios',
    timestamps: false, // Si no estás usando timestamps
});
exports.default = Usuario;
