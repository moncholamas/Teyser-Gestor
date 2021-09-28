import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class equipos extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_equipo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    estado: {
      type: DataTypes.ENUM("operativo","en mantenimiento","inoperable"),
      allowNull: true
    },
    nombre_tecnico: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    nombre_fantasia: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    categoria: {
      type: DataTypes.ENUM("impresora","fotocopiadora","libreria","red","otro"),
      allowNull: true
    },
    udatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'equipos',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "PK7",
        unique: true,
        fields: [
          { name: "id_equipo" },
        ]
      },
    ]
  });
  return equipos;
  }
}
