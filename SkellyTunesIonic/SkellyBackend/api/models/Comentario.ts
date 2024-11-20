import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../../config/skellybase';
import Cancion from './Cancion';  // Importar Cancion aquí

// Extiende de Model para tipos más seguros
class Comentario extends Model {
  public id!: number;
  public comentario!: string;
  public usuario!: string;
  public cancion!: number; 
  public CreatedAt!: Date;
  public UpdatedAt!: Date;
}

// Inicializa el modelo con sequelize
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
    sequelize,
    modelName: 'Comentario',
    tableName: 'comentarios',
    timestamps: true,
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt',
  }
);

// Aquí es donde hacemos las relaciones después de la definición
Comentario.belongsTo(Cancion, { foreignKey: 'cancion' });
Cancion.hasMany(Comentario, { foreignKey: 'cancion' });

export default Comentario;
