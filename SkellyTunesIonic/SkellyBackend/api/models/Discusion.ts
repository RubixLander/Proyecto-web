import { DataTypes, Model, Sequelize } from 'sequelize';

// Extiende de Model para tipos más seguros
class Discusion extends Model {
  public id!: number;
  public titulo!: string;
  public detalle!: string;
  public comunidad!: number;
  public creador!: string;
  public fecha!: Date;
}

export default (sequelize: Sequelize) => {
  // Inicializar el modelo con sequelize
  Discusion.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      titulo: { type: DataTypes.STRING, allowNull: true },
      detalle: { type: DataTypes.TEXT, allowNull: true },
      comunidad: { type: DataTypes.INTEGER, allowNull: true },
      creador: { type: DataTypes.STRING, allowNull: true },
      fecha: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize,              // Pasa la instancia de sequelize
      modelName: 'Discusion', // Nombre del modelo
      tableName: 'discusiones', // Nombre de la tabla
      timestamps: false,      // No se utilizan los campos CreatedAt y UpdatedAt
    }
  );

  return Discusion;
};
