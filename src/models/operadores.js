import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class operadores extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_operador: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    apellido: {
      type: DataTypes.CHAR(10),
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    clave: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tipo_operador: {
      type: DataTypes.ENUM("operario","admin","tecnico"),
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'operadores',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "PK3",
        unique: true,
        fields: [
          { name: "id_operador" },
        ]
      },
    ]
  });
  return operadores;
  }
}
