import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../../config/skellybase';

class Perfiles extends Model {
  public tag!: string;  // Usamos tag como la clave primaria
  public avatar!: string;
  public background!: string;
  public informacion!: string;
}

// Inicializa el modelo de Perfiles con `tag` como la clave primaria
Perfiles.init(
  {
    tag: {
      type: DataTypes.STRING,
      primaryKey: true,  // Hacemos que `tag` sea la clave primaria
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    background: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    informacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize, // La instancia de sequelize para conectar
    modelName: 'Perfiles',
    tableName: 'perfiles',
    timestamps: false, // Si no necesitas timestamps
  }
);

export default Perfiles;

