"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Definimos la clase Genero que extiende de Model
class Genero extends sequelize_1.Model {
}
// Inicializamos el modelo Genero
exports.default = (sequelize) => {
    Genero.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, // Esto indica que el ID es autoincremental
        },
        nombre: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false, // Aseguramos que el nombre no pueda ser nulo
        },
    }, {
        sequelize, // Pasamos la instancia de Sequelize
        modelName: 'Genero', // Nombre del modelo
        tableName: 'generos', // Nombre de la tabla en la base de datos
        timestamps: false, // Desactivamos los campos createdAt y updatedAt si no los usamos
    });
    return Genero;
};
