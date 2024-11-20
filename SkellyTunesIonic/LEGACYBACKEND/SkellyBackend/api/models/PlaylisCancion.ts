import { DataTypes, Model, Sequelize } from 'sequelize';

// Extiende de Model para tipos más seguros
class PlaylistCancion extends Model {
  public playlist_id!: number;
  public cancion_id!: number;
}

export default (sequelize: Sequelize) => {
  // Inicializar el modelo con sequelize
  PlaylistCancion.init(
    {
      playlist_id: { type: DataTypes.INTEGER, primaryKey: true },
      cancion_id: { type: DataTypes.INTEGER, primaryKey: true },
    },
    {
      sequelize,                  // Pasa la instancia de sequelize
      modelName: 'PlaylistCancion', // Nombre del modelo
      tableName: 'playlist_canciones', // Nombre de la tabla
      timestamps: false,           // No se gestionan los campos CreatedAt y UpdatedAt
    }
  );

  return PlaylistCancion;
};