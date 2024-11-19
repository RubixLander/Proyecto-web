import { DataTypes, Model, Sequelize } from 'sequelize';

// Extiende de Model para tipos más seguros
class Comentario extends Model {
  public id!: number;
  public comentario!: string;
  public usuario!: string;
  public cancion!: number;
  public CreatedAt!: Date;
  public UpdatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  // Inicializar el modelo con sequelize
  Comentario.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      comentario: { type: DataTypes.STRING, allowNull: true },
      usuario: { type: DataTypes.STRING, allowNull: true },
      cancion: { type: DataTypes.INTEGER, allowNull: true },
      CreatedAt: { type: DataTypes.DATE, allowNull: true },
      UpdatedAt: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize,                // Pasa la instancia de sequelize
      modelName: 'Comentario',  // Nombre del modelo
      tableName: 'comentarios', // Nombre de la tabla
      timestamps: true,         // Habilita los campos CreatedAt y UpdatedAt
      createdAt: 'CreatedAt',   // Nombre explícito del campo CreatedAt
      updatedAt: 'UpdatedAt',   // Nombre explícito del campo UpdatedAt
    }
  );

  return Comentario;
};
