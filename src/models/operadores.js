import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class operadores extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_operador: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate:{
        notEmpty: {
          args: true,
          msg: "el nombre es un campo requerido"
        }
      }
    },
    apellido: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      validate:{
        notEmpty: {
          args: true,
          msg: "el apellido es un campo requerido"
        }
      }
    },
    correo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate:{
        isEmail:{
          args: true,
          msg: "ingrese un correo con un formato válido"
        },
        notEmpty:{
          args: true,
          msg: "el correo es un campo requerido"
        }
      }
    },
    clave: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tipo_operador: {
      type: DataTypes.ENUM("operario","admin","tecnico"),
      allowNull: true,
      validate:{
        isIn:{
          args: [["operario","admin","tecnico"]],
          msg: "ingrese un tipo de operador válido"
        }
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'operadores',
    schema: 'public',
    timestamps: true,
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
  return operadores;
  }
}
