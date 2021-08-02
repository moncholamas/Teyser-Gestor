import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class parte_diario extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_parte_diario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_operador: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      references: {
        model: 'operador',
        key: 'id_operador'
      }
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: true
    },
    hora_cierre: {
      type: DataTypes.TIME,
      allowNull: true
    },
    turno: {
      type: DataTypes.ENUM("maniana","tarde","noche"),
      allowNull: false
    },
    recaudacion: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    observacion: {
      type: DataTypes.STRING(300),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'parte_diario',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK2",
        unique: true,
        fields: [
          { name: "id_parte_diario" },
        ]
      },
    ]
  });
  return parte_diario;
  }
}
