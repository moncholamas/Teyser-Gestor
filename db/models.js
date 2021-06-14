const {DataTypes} = require('sequelize');
const db = require('./db');

//definicion de los modelos -> relaciones

//equipos
const Equipo = db.define('Equipo',{
    id_equipo: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    identificador:{
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    tableName: 'equipos'
});

module.exports = Equipo;