import { DataTypes, Model, Sequelize } from 'sequelize';

// Extiende de Model para tipos más seguros
class Respuesta extends Model {
  public id!: number;
  public creador!: string;
  public discussion!: number;
  public detalle!: string;
  public fecha!: Date;
  public reply!: number | null;  // Puede ser null si no tiene una respuesta
}

export default (sequelize: Sequelize) => {
  // Inicializar el modelo con sequelize
  Respuesta.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      creador: { type: DataTypes.STRING, allowNull: true },
      discussion: { type: DataTypes.INTEGER, allowNull: true },
      detalle: { type: DataTypes.STRING, allowNull: true },
      fecha: { type: DataTypes.DATE, allowNull: true },
      reply: { type: DataTypes.INTEGER, allowNull: true }, // Puede ser null
    },
    {
      sequelize,               // Pasa la instancia de sequelize
      modelName: 'Respuesta',  // Nombre del modelo
      tableName: 'respuestas', // Nombre de la tabla
      timestamps: false,       // No se utilizan los campos CreatedAt y UpdatedAt
    }
  );

  return Respuesta;
};
