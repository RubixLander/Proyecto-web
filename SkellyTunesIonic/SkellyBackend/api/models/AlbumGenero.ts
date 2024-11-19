import { DataTypes, Model, Sequelize } from 'sequelize';

// Extiende de Model para tipos más seguros
class AlbumGenero extends Model {
  public album_id!: number;
  public genero_id!: number;
}

export default (sequelize: Sequelize) => {
  // Inicializar el modelo con sequelize
  AlbumGenero.init(
    {
      album_id: { type: DataTypes.INTEGER, primaryKey: true },
      genero_id: { type: DataTypes.INTEGER, primaryKey: true },
    },
    {
      sequelize,                // Pasa la instancia de sequelize
      modelName: 'AlbumGenero', // Nombre del modelo
      tableName: 'album_generos', // Nombre de la tabla
      timestamps: false,        // No se gestionan los campos CreatedAt y UpdatedAt
    }
  );

  return AlbumGenero;
};
