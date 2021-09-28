import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class novedades extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_novedad: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha_actualizacion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    categoria: {
      type: DataTypes.ENUM("emergencia","mantenimiento","informativa"),
      allowNull: true
    },
    estado: {
      type: DataTypes.ENUM("nuevo","arreglado","trabajando"),
      allowNull: true
    },
    novedad: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    observacion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id_operador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'operadores',
        key: 'id_operador'
      }
    },
    id_equipo: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      references: {
        model: 'equipos',
        key: 'id_equipo'
      }
    }
  }, {
    sequelize,
    tableName: 'novedades',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK15",
        unique: true,
        fields: [
          { name: "id_novedad" },
        ]
      },
    ]
  });
  return novedades;
  }
}
