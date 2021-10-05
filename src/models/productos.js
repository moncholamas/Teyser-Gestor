import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class productos extends Model {
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
    categoria: {
      type: DataTypes.ENUM("impresion","fotocopia","articulo de libreria","servicio","servicio digital","otro"),
      allowNull: true
    },
    estado: {
      type: DataTypes.ENUM("activo","inactivo"),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'productos',
    schema: 'public',
    hasTrigger: true,
    createdAt: Sequelize.Date,
    updatedAt: false,
    timestamps: true,
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
  return productos;
  }
}
