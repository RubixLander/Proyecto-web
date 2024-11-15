import { DataTypes, Model, Sequelize } from 'sequelize';

// Extiende de Model para tipos más seguros
class Usuario extends Model {
  public tag!: string;
  public nombre!: string;
  public contrasena!: string;
}

export default (sequelize: Sequelize) => {
  // Inicializar el modelo con sequelize
  Usuario.init(
    {
      tag: { type: DataTypes.STRING, primaryKey: true },
      nombre: { type: DataTypes.STRING, allowNull: false },
      contrasena: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,             // Pasa la instancia de sequelize
      modelName: 'Usuario',  // Nombre del modelo
      tableName: 'usuarios', // Nombre de la tabla
    }
  );

  return Usuario;
};
