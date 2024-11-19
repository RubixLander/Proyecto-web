import { DataTypes, Model, Sequelize } from 'sequelize';

// Extiende de Model para tener tipos más seguros
class Playlist extends Model {
  public id!: number;
  public titulo!: string;
  public detalle!: string;
  public creador!: string;
  public CreatedAt!: Date;
  public UpdatedAt!: Date;
}

export default (sequelize: Sequelize) => {
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
      sequelize,               // Pasa la instancia de sequelize
      modelName: 'Playlist',   // Nombre del modelo
      tableName: 'playlists',  // Nombre de la tabla
      timestamps: true,        // Habilita los campos CreatedAt y UpdatedAt
      createdAt: 'CreatedAt',  // Nombre explícito del campo CreatedAt
      updatedAt: 'UpdatedAt',  // Nombre explícito del campo UpdatedAt
    }
  );

  return Playlist;
};
