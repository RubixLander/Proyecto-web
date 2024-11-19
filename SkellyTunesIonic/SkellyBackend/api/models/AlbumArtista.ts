import { DataTypes, Model, Sequelize } from 'sequelize';

// Extiende de Model para tipos más seguros
class AlbumArtista extends Model {
  public usuario_tag!: string;
  public album_id!: number;
}

export default (sequelize: Sequelize) => {
  // Inicializar el modelo con sequelize
  AlbumArtista.init(
    {
      usuario_tag: { type: DataTypes.STRING, primaryKey: true },
      album_id: { type: DataTypes.INTEGER, primaryKey: true },
    },
    {
      sequelize,               // Pasa la instancia de sequelize
      modelName: 'AlbumArtista', // Nombre del modelo
      tableName: 'album_artistas', // Nombre de la tabla
      timestamps: false,        // No se gestionan los campos CreatedAt y UpdatedAt
    }
  );

  return AlbumArtista;
};
