'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({Rol}) {
      this.belongsTo(Rol,{
        foreignKey: 'rolId',
        targetKey: 'id'
      });
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rolId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true
  });
  return User;
};