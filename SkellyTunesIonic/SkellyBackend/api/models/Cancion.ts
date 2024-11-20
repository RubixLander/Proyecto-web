import { DataTypes, Model, Association } from 'sequelize';
import sequelize from '../../config/skellybase';
import Comentario from './Comentario';  // Importar Comentario aquí

// Definimos la clase Cancion que extiende de Model
class Cancion extends Model {
  public id!: number;
  public track!: number;
  public titulo!: string;
  public duracion!: string;
  public album!: number;

  // Relación con los comentarios
  public readonly Comentarios?: Comentario[];

  // Para establecer la asociación correctamente
  public static associations: {
    Comentarios: Association<Cancion, Comentario>;
  };

  // Método estático para establecer la relación
  public static associate(models: any) {
    // Relación hasMany
    Cancion.hasMany(models.Comentario, { foreignKey: 'cancion' });
  }
}

// Inicializa el modelo de Canción con la conexión a Sequelize
Cancion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    track: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duracion: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    album: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Cancion',
    tableName: 'canciones',
    timestamps: false,
  }
);

export default Cancion;
