"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Definimos la clase Album que extiende de Model
class Album extends sequelize_1.Model {
}
// Inicializamos el modelo Album
exports.default = (sequelize) => {
    Album.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, // Esto indica que el ID es autoincremental
        },
        coverArt: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true, // Permite que coverArt sea nulo (en caso de que no tenga portada)
        },
        titulo: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false, // Aseguramos que el título no sea nulo
        },
        anio: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false, // Aseguramos que el año no sea nulo
        },
    }, {
        sequelize, // Pasamos la instancia de Sequelize
        modelName: 'Album', // Nombre del modelo
        tableName: 'albums', // Nombre de la tabla en la base de datos
        timestamps: false, // Desactivamos los campos createdAt y updatedAt si no los usamos
    });
    return Album;
};
