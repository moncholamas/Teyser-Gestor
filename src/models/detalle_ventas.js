import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class detalle_ventas extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_producto: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'producto',
        key: 'id_producto'
      }
    },
    id_venta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'venta',
        key: 'id_venta'
      }
    },
    cantidad: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'detalle_ventas',
    schema: 'public',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PK13",
        unique: true,
        fields: [
          { name: "id_producto" },
          { name: "id_venta" },
        ]
      },
    ]
  });
  return detalle_ventas;
  }
}
