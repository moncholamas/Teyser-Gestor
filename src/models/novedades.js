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
    id_parte_diario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'parte_diario',
        key: 'id_parte_diario'
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
