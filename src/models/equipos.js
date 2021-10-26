import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class equipos extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_equipo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    estado: {
      type: DataTypes.ENUM("operativo","en mantenimiento","inoperable"),
      allowNull: false,
      validate:{
        notEmpty:{
          args: true,
          msg: "el estado del equipo es un campo requerido"
        }
      },
    },
    nombre_tecnico: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate:{
        notEmpty:{
          args: true,
          msg: "el nombre técnico es un campo requerido"
        }
      },
    },
    nombre_fantasia: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    categoria: {
      type: DataTypes.ENUM("impresora","fotocopiadora","libreria","red","otro"),
      allowNull: true,
      validate:{
        notEmpty:{
          args: true,
          msg: "la categoria del equipo es un campo requerido"
        }
      }
    }
  }, {
    sequelize,
    tableName: 'equipos',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "PK7",
        unique: true,
        fields: [
          { name: "id_equipo" },
        ]
      },
    ]
  });
  return equipos;
  }
}
