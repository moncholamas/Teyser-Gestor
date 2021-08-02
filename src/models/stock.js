import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class stock extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_insumo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'insumos',
        key: 'id_insumo'
      }
    },
    cantidad: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'stock',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK17",
        unique: true,
        fields: [
          { name: "id_insumo" },
        ]
      },
    ]
  });
  return stock;
  }
}
