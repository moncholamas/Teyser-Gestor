import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class versiones_productos extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_version_producto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    precio: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'versiones_productos',
    schema: 'public',
    createdAt: Sequelize.Date,
    updatedAt: false,
    timestamps: true,
    indexes: [
      {
        name: "PK31",
        unique: true,
        fields: [
          { name: "id_version_producto" },
        ]
      },
    ]
  });
  return versiones_productos;
  }
}
