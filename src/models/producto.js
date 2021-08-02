import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class producto extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_producto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    precio: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    categoria: {
      type: DataTypes.ENUM("impresion","fotocopia","articulo de libreria","servicio","servicio digital","otro"),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'producto',
    schema: 'public',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PK4",
        unique: true,
        fields: [
          { name: "id_producto" },
        ]
      },
    ]
  });
  return producto;
  }
}
