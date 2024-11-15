import { DataTypes, Model, Sequelize } from 'sequelize';

// Definimos la clase Album que extiende de Model
class Album extends Model {
  public id!: number;          // El ID es la clave primaria y es un número
  public coverArt!: string;    // La portada del álbum es una cadena de texto
  public titulo!: string;      // El título del álbum es una cadena de texto
  public anio!: number;        // El año del álbum es un número entero
}

// Inicializamos el modelo Album
export default (sequelize: Sequelize) => {
  Album.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Esto indica que el ID es autoincremental
      },
      coverArt: {
        type: DataTypes.STRING,
        allowNull: true,  // Permite que coverArt sea nulo (en caso de que no tenga portada)
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false, // Aseguramos que el título no sea nulo
      },
      anio: {
        type: DataTypes.INTEGER,
        allowNull: false, // Aseguramos que el año no sea nulo
      },
    },
    {
      sequelize, // Pasamos la instancia de Sequelize
      modelName: 'Album', // Nombre del modelo
      tableName: 'albums', // Nombre de la tabla en la base de datos
      timestamps: false, // Desactivamos los campos createdAt y updatedAt si no los usamos
    }
  );

  return Album;
};
