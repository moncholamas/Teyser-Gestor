import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class pagos extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_compra: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipo: {
      type: DataTypes.ENUM("compra de insumo","luz","internet","rentas","afip","municipio","otro"),
      allowNull: true,
      validate:{
        notEmpty:{
          args: true,
          msg: "el tipo de pago es un campo requerido"
        },
        isIn:{
          args: [["compra de insumo","luz","internet","rentas","afip","municipio","otro"]],
          msg: "ingrese un tipo de pago válido"
        }
      }
    },
    observacion: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    id_operador: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      references: {
        model: 'operadores',
        key: 'id_operador'
      }
    }
  }, {
    sequelize,
    tableName: 'pagos',
    schema: 'public',
    hasTrigger: true,
    createdAt: Sequelize.Date,
    updatedAt: false,
    timestamps: true,
    indexes: [
      {
        name: "PK18",
        unique: true,
        fields: [
          { name: "id_compra" },
        ]
      },
    ]
  });
  return pagos;
  }
}
