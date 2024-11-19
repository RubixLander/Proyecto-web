"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Definimos la clase Cancion que extiende de Model
class Cancion extends sequelize_1.Model {
}
// Inicializamos el modelo Cancion
exports.default = (sequelize) => {
    Cancion.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, // Esto indica que el ID es autoincremental
        },
        track: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false, // Aseguramos que track no sea nulo
        },
        titulo: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false, // Aseguramos que el título no sea nulo
        },
        duracion: {
            type: sequelize_1.DataTypes.TIME,
            allowNull: false, // Aseguramos que la duración no sea nula
        },
        album: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false, // Aseguramos que el ID del álbum no sea nulo
        },
    }, {
        sequelize, // Pasamos la instancia de Sequelize
        modelName: 'Cancion', // Nombre del modelo
        tableName: 'canciones', // Nombre de la tabla en la base de datos
        timestamps: false, // Desactivamos los campos createdAt y updatedAt si no los usamos
    });
    return Cancion;
};
