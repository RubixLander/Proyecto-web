import { DataTypes, Model, Sequelize } from 'sequelize';

// Extiende de Model para tipos más seguros
class Comunidad extends Model {
  public id!: number;
  public nombre!: string;
  public creador!: string;
  public headertext?: string;
  public background?:string;
  public avatar?:string;
  public informacion?:string;
}

export default (sequelize: Sequelize) => {
  // Inicializar el modelo con sequelize
  Comunidad.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: { type: DataTypes.STRING, allowNull: true },
      creador: { type: DataTypes.STRING, allowNull: true },
      headertext: {         // Definimos el campo headertext
        type: DataTypes.STRING, 
        allowNull: true,    // Es opcional, por lo que puede ser null
      },
      background: {        // Definimos el campo background
        type: DataTypes.STRING, 
        allowNull: true,    // Es opcional, puede ser null
      },
      avatar: {            // Definimos el campo avatar
        type: DataTypes.STRING, 
        allowNull: true,    // Es opcional, puede ser null
      },
      informacion: {       // Definimos el campo informacion
        type: DataTypes.STRING, 
        allowNull: true,    // Es opcional, puede ser null
      },
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
