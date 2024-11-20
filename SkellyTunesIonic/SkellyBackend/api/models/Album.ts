import { DataTypes, Model, Sequelize, Association } from 'sequelize';
import Genero from './Genero';  // Aseguramos que importamos Genero
import sequelize from '../../config/skellybase';

// Definimos la clase Album que extiende de Model
class Album extends Model {
  public id!: number;
  public coverArt!: string;
  public titulo!: string;
  public anio!: number;

  // Relación con los géneros
  public readonly Generos?: Genero[];

  // Para establecer la asociación correctamente
  public static associations: {
    Generos: Association<Album, Genero>;
  };

  // Método estático para establecer las relaciones
  public static associate(models: any) {
    // Relación belongsToMany con Genero (muchos a muchos)
    Album.belongsToMany(models.Genero, { through: models.AlbumGenero, foreignKey: 'albumId' });
  }
}

// Inicializa el modelo Album
Album.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    coverArt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Album',
    tableName: 'albums',
    timestamps: false,
  }
);

export default Album;
