// models/Usuario.ts
import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../../config/skellybase';  // Asegúrate de que la conexión a la DB esté configurada correctamente

class Usuario extends Model {
  public tag!: string;
  public nombre!: string;
  public contrasena!: string;
  public rol!: string;
  public correo!: string;
}

// Inicializa el modelo de Usuario con la conexión a Sequelize
Usuario.init(
  {
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'user',  // Por defecto, el rol es 'user'
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  // Asegúrate de que el correo sea único
    },
  },
  {
    sequelize, // La instancia de sequelize para conectar
    modelName: 'Usuario',
    tableName: 'usuarios',
    timestamps: false, // Si no estás usando timestamps
  }
);

export default Usuario;
