import { DataTypes, Model, Sequelize, Association } from 'sequelize';
import Cancion from './Cancion';  // Aseguramos que importamos Cancion
import Album from './Album';      // Aseguramos que importamos Album
import sequelize from '../../config/skellybase';

// Definimos la clase Genero que extiende de Model
class Genero extends Model {
  public id!: number;
  public nombre!: string;

  // Relación con las canciones y álbumes
  public readonly Canciones?: Cancion[];
  public readonly Albums?: Album[];

  // Para establecer la asociación correctamente
  public static associations: {
    Canciones: Association<Genero, Cancion>;
    Albums: Association<Genero, Album>;
  };

  // Método estático para establecer las relaciones
  public static associate(models: any) {
    // Relación belongsToMany con Cancion (muchos a muchos)
    Genero.belongsToMany(models.Cancion, { through: models.CancionGenero, foreignKey: 'generoId' });

    // Relación belongsToMany con Album (muchos a muchos)
    Genero.belongsToMany(models.Album, { through: models.AlbumGenero, foreignKey: 'generoId' });
  }
}

// Inicializamos el modelo Genero
Genero.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false, // Aseguramos que el nombre no sea nulo
    },
  },
  {
    sequelize,
    modelName: 'Genero',
    tableName: 'generos',
    timestamps: false, // Desactivamos los timestamps (createdAt y updatedAt)
  }
);

export default Genero;
