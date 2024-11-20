import { DataTypes, Model, Sequelize, Association } from 'sequelize';
import Cancion from './Cancion';  // Aseguramos que importamos Cancion
import sequelize from '../../config/skellybase';

// Extiende de Model para tener tipos más seguros
class Playlist extends Model {
  setCanciones(cancionesEncontradas: Cancion[]) {
      throw new Error('Method not implemented.');
  }
  public id!: number;
  public titulo!: string;
  public detalle!: string;
  public creador!: string;
  public CreatedAt!: Date;
  public UpdatedAt!: Date;

  // Relación con las canciones
  public readonly Canciones?: Cancion[];

  // Para establecer la asociación correctamente
  public static associations: {
    Canciones: Association<Playlist, Cancion>;
  };

  // Método estático para establecer las relaciones
  public static associate(models: any) {
    // Relación belongsToMany con Cancion (muchos a muchos)
    Playlist.belongsToMany(models.Cancion, { through: models.PlaylistCancion, foreignKey: 'playlistId' });
  }
}

// Inicializar el modelo con sequelize
Playlist.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titulo: { type: DataTypes.STRING, allowNull: true },
    detalle: { type: DataTypes.STRING, allowNull: true },
    creador: { type: DataTypes.STRING, allowNull: true },
    CreatedAt: { type: DataTypes.DATE, allowNull: true },
    UpdatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    modelName: 'Playlist',
    tableName: 'playlists',
    timestamps: true,
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt',
  }
);

export default Playlist;
