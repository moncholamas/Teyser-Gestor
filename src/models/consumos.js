import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class consumos extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_producto: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'productos',
        key: 'id_producto'
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
    cantidad: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'consumos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK22",
        unique: true,
        fields: [
          { name: "id_producto" },
          { name: "id_insumo" },
        ]
      },
    ]
  });
  return consumos;
  }
}
