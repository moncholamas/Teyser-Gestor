import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class venta extends Model {
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
    id_parte_diario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'parte_diario',
        key: 'id_parte_diario'
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
    tableName: 'venta',
    schema: 'public',
    hasTrigger: true,
    timestamps: false,
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
  return venta;
  }
}
