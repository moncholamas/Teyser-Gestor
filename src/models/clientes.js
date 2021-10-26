import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class clientes extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_cliente: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate:{
        notEmpty:{
          args: true,
          msg: "el nombre es un campo requerido"
        }
      }
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate:{
        notEmpty:{
          args: true,
          msg: "el apellido es un campo requerido"
        }
      }
    },
    telefono: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    correo: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'clientes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK19",
        unique: true,
        fields: [
          { name: "id_cliente" },
        ]
      },
    ]
  });
  return clientes;
  }
}
