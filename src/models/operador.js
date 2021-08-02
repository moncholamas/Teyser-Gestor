import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class operador extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_operador: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cuenta: {
      type: DataTypes.ENUM("activo","inactivo"),
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    apellido: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    correo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tipo_operador: {
      type: DataTypes.ENUM("operario","admin","tecnico"),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'operador',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK3",
        unique: true,
        fields: [
          { name: "id_operador" },
        ]
      },
    ]
  });
  return operador;
  }
}
