import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class novedades extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_novedad: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    categoria: {
      type: DataTypes.ENUM("emergencia","mantenimiento","informativa"),
      allowNull: true,
      validate:{
        notEmpty:{
          args: true,
          msg: "la categoria es un campo requerido"
        },
        isIn:{
          args: [["emergencia","mantenimiento","informativa"]],
          msg: "ingrese una categoria válida"
        }
      }
    },
    estado: {
      type: DataTypes.ENUM("nuevo","arreglado","trabajando"),
      allowNull: true,
      validate:{
        notEmpty:{
          args: true,
          msg: "el estado de la novedad es un campo requerido"
        },
        isIn:{
          args: [["nuevo","arreglado","trabajando"]],
          msg: "ingrese un estado válido"
        }
      }
    },
    novedad: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate:{
        notEmpty:{
          args: true,
          msg : "la titulo de la novedad es un campo requerido"
        }
      }
    },
    observacion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id_operador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'operadores',
        key: 'id_operador'
      }
    },
    id_equipo: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      references: {
        model: 'equipos',
        key: 'id_equipo'
      }
    }
  }, {
    sequelize,
    tableName: 'novedades',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "PK15",
        unique: true,
        fields: [
          { name: "id_novedad" },
        ]
      },
    ]
  });
  return novedades;
  }
}
