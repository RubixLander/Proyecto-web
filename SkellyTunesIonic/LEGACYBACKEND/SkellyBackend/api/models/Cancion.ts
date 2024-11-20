import { DataTypes, Model, Association } from 'sequelize';
import sequelize from '../../config/skellybase';
import Comentario from './Comentario';
import Playlist from './Playlist';
import Genero from './Genero';  // Aseguramos que importamos Genero

// Definimos la clase Cancion que extiende de Model
class Cancion extends Model {
  setGeneros(generosEncontrados: Genero[]) {
      throw new Error('Method not implemented.');
  }
  public id!: number;
  public track!: number;
  public titulo!: string;
  public duracion!: string;
  public album!: number;

  // Relación con los comentarios
  public readonly Comentarios?: Comentario[];
  public readonly Playlists?: Playlist[];
  public readonly Generos?: Genero[];

  // Para establecer la asociación correctamente
  public static associations: {
    Comentarios: Association<Cancion, Comentario>;
    Playlists: Association<Cancion, Playlist>;
    Generos: Association<Cancion, Genero>;
  };

  // Método estático para establecer las relaciones
  public static associate(models: any) {
    // Relación hasMany con Comentario
    Cancion.hasMany(models.Comentario, { foreignKey: 'cancion' });

    // Relación belongsToMany con Playlist (muchos a muchos)
    Cancion.belongsToMany(models.Playlist, { through: models.PlaylistCancion, foreignKey: 'cancionId' });

    // Relación belongsToMany con Genero (muchos a muchos)
    Cancion.belongsToMany(models.Genero, { through: models.CancionGenero, foreignKey: 'cancionId' });
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
