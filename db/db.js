const {Sequelize, Model} = require('sequelize');

const sequelize = new Sequelize('teyserdb', 'manuel','Peques09',{
    host: 'localhost',
    dialect: 'postgres'
});



module.exports = sequelize;