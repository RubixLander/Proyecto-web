import { DataTypes, Model, Sequelize } from 'sequelize';

// Extiende de Model para tipos más seguros
class CancionGenero extends Model {
  public cancion_id!: number;
  public genero_id!: number;
}

export default (sequelize: Sequelize) => {
  // Inicializar el modelo con sequelize
  CancionGenero.init(
    {
      cancion_id: { type: DataTypes.INTEGER, primaryKey: true },
      genero_id: { type: DataTypes.INTEGER, primaryKey: true },
    },
    {
      sequelize,                  // Pasa la instancia de sequelize
      modelName: 'CancionGenero',  // Nombre del modelo
      tableName: 'cancion_generos', // Nombre de la tabla
      timestamps: false,           // No se gestionan los campos CreatedAt y UpdatedAt
    }
  );

  return CancionGenero;
};
