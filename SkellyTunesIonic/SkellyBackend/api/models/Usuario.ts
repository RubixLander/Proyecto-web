import { Sequelize, DataTypes, Model, Association } from 'sequelize';
import sequelize from '../../config/skellybase';  // Asegúrate de que la conexión a la DB esté configurada correctamente
import Perfiles from './Perfiles';  // Importa el modelo de Perfil
import SeguidosUsuarios from './SeguidosUsuarios'; // Importar el modelo de SeguidosUsuarios

class Usuario extends Model {
  public tag!: string;
  public nombre!: string;
  public contrasena!: string;
  public rol!: string;
  public correo!: string;
  public headertext?: string;

  // Definir la relación con el perfil
  public Perfil?: Perfiles;  // Esta propiedad será opcional, ya que no siempre estará presente

  // Relaciones de seguidores y seguidos
  public readonly Seguidores?: Usuario[];  // Usuarios que siguen a este usuario
  public readonly Seguidos?: Usuario[];    // Usuarios que este usuario sigue

  // Para establecer la asociación correctamente
  public static associations: {
    Perfil: Association<Usuario, Perfiles>;
    Seguidores: Association<Usuario, Usuario>;
    Seguidos: Association<Usuario, Usuario>;
  };
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
    headertext: {
      type: DataTypes.STRING,  // Definimos el tipo de la columna
      allowNull: true,         // Es opcional, por lo que puede ser null
    },
  },
  {
    sequelize, // La instancia de sequelize para conectar
    modelName: 'Usuario',
    tableName: 'usuarios',
    timestamps: false, // Si no estás usando timestamps
  }
);

// Relaciones de 'Perfil'
Usuario.hasOne(Perfiles, { foreignKey: 'tag' });
Perfiles.belongsTo(Usuario, { foreignKey: 'tag' });

// Relaciones de 'Seguidos' y 'Seguidores'
Usuario.belongsToMany(Usuario, {
  as: 'SeguidosPor',  // Cambiar el alias a 'SeguidosPor'
  through: SeguidosUsuarios,
  foreignKey: 'seguido_tag',
});

Usuario.belongsToMany(Usuario, {
  as: 'Seguidos',     // Mantener 'Seguidos' para los seguidos
  through: SeguidosUsuarios,
  foreignKey: 'seguidor_tag',
});

export default Usuario;