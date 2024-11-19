import { DataTypes, Model, Sequelize } from 'sequelize';

// Definimos la clase Cancion que extiende de Model
class Cancion extends Model {
  public id!: number;       // El ID es la clave primaria y es un número
  public track!: number;    // El track es un número entero (puede ser el número de pista en el álbum)
  public titulo!: string;   // El título de la canción es una cadena de texto
  public duracion!: string; // La duración es de tipo TIME, representada como cadena de texto
  public album!: number;    // El album es un número entero (relacionado con el ID de un álbum)
}

// Inicializamos el modelo Cancion
export default (sequelize: Sequelize) => {
  Cancion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Esto indica que el ID es autoincremental
      },
      track: {
        type: DataTypes.INTEGER,
        allowNull: false, // Aseguramos que track no sea nulo
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false, // Aseguramos que el título no sea nulo
      },
      duracion: {
        type: DataTypes.TIME,
        allowNull: false, // Aseguramos que la duración no sea nula
      },
      album: {
        type: DataTypes.INTEGER,
        allowNull: false, // Aseguramos que el ID del álbum no sea nulo
      },
    },
    {
      sequelize, // Pasamos la instancia de Sequelize
      modelName: 'Cancion', // Nombre del modelo
      tableName: 'canciones', // Nombre de la tabla en la base de datos
      timestamps: false, // Desactivamos los campos createdAt y updatedAt si no los usamos
    }
  );

  return Cancion;
};
