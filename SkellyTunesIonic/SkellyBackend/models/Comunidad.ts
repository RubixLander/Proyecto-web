import { DataTypes, Model, Sequelize } from 'sequelize';

// Extiende de Model para tipos más seguros
class Comunidad extends Model {
  public id!: number;
  public nombre!: string;
  public creador!: string;
}

export default (sequelize: Sequelize) => {
  // Inicializar el modelo con sequelize
  Comunidad.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: { type: DataTypes.STRING, allowNull: true },
      creador: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,              // Pasa la instancia de sequelize
      modelName: 'Comunidad', // Nombre del modelo
      tableName: 'comunidades', // Nombre de la tabla
      timestamps: false,      // No se utilizan los campos CreatedAt y UpdatedAt
    }
  );

  return Comunidad;
};
