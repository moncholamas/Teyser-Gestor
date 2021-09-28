import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ventas extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_venta: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    observacion: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM("pendiente","cancelado"),
      allowNull: false
    },
    id_operador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'operadores',
        key: 'id_operador'
      }
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clientes',
        key: 'id_cliente'
      }
    }
  }, {
    sequelize,
    tableName: 'ventas',
    schema: 'public',
    hasTrigger: true,
    timestamps: true,
    indexes: [
      {
        name: "PK5",
        unique: true,
        fields: [
          { name: "id_venta" },
        ]
      },
    ]
  });
  return ventas;
  }
}
