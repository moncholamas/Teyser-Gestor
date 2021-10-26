import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class detalle_compras extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_compra: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'pagos',
        key: 'id_compra'
      }
    },
    id_insumo: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'insumos',
        key: 'id_insumo'
      }
    },
    precio: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate:{
        notEmpty:{
          args: true,
          msg: "el precio del insumo es un campo requerido"
        }
      }
    },
    cantidad: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate:{
        notEmpty:{
          args: true,
          msg: "la cantidad de insumos es un campo requerido"
        }
      },
    }
  }, {
    sequelize,
    tableName: 'detalle_compras',
    schema: 'public',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PK16",
        unique: true,
        fields: [
          { name: "id_compra" },
          { name: "id_insumo" },
        ]
      },
    ]
  });
  return detalle_compras;
  }
}
