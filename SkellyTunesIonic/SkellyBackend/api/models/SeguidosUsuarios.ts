import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../../config/skellybase';

class SeguidosUsuarios extends Model {
  public seguidor_tag!: string;
  public seguido_tag!: string;
}

SeguidosUsuarios.init(
  {
    seguidor_tag: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'usuarios', // Referencia al modelo Usuario
        key: 'tag',
      },
    },
    seguido_tag: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'usuarios', // Referencia al modelo Usuario
        key: 'tag',
      },
    },
  },
  {
    sequelize,
    modelName: 'SeguidosUsuarios',
    tableName: 'seguidos_usuarios',
    timestamps: false, // Si no usas columnas de createdAt y updatedAt
  }
);

export default SeguidosUsuarios;
