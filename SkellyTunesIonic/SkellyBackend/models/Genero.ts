import { DataTypes, Model, Sequelize } from 'sequelize';

// Definimos la clase Genero que extiende de Model
class Genero extends Model {
  public id!: number;      // El ID es la clave primaria y es un número
  public nombre!: string;  // El nombre del género es una cadena de texto
}

// Inicializamos el modelo Genero
export default (sequelize: Sequelize) => {
  Genero.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Esto indica que el ID es autoincremental
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false, // Aseguramos que el nombre no pueda ser nulo
      },
    },
    {
      sequelize, // Pasamos la instancia de Sequelize
      modelName: 'Genero', // Nombre del modelo
      tableName: 'generos', // Nombre de la tabla en la base de datos
      timestamps: false, // Desactivamos los campos createdAt y updatedAt si no los usamos
    }
  );

  return Genero;
};
