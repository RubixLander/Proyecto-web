import { DataTypes, Model, Sequelize } from 'sequelize';

// Extiende de Model para tipos más seguros
class MiembroComunidad extends Model {
  public usuario_tag!: string;
  public comunidad_id!: number;
}

export default (sequelize: Sequelize) => {
  // Inicializar el modelo con sequelize
  MiembroComunidad.init(
    {
      usuario_tag: { type: DataTypes.STRING, primaryKey: true },
      comunidad_id: { type: DataTypes.INTEGER, primaryKey: true },
    },
    {
      sequelize,                  // Pasa la instancia de sequelize
      modelName: 'MiembroComunidad', // Nombre del modelo
      tableName: 'miembro_comunidades', // Nombre de la tabla
      timestamps: false,           // No se gestionan los campos CreatedAt y UpdatedAt
    }
  );

  return MiembroComunidad;
};
