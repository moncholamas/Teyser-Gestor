import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class insumos extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_insumo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    unidades: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      validate:{
        notEmpty:{
          args: true,
          msg: "unidades es un campo requerido"
        }
      }
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate:{
        notEmpty:{
          args: true,
          msg: "el nombre es un campo requerido"
        }
      }
    },
    presentacion: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'insumos',
    schema: 'public',
    hasTrigger: true,
    timestamps: true,
    indexes: [
      {
        name: "PK9",
        unique: true,
        fields: [
          { name: "id_insumo" },
        ]
      },
    ]
  });
  return insumos;
  }
}
