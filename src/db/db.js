import Sequelize from 'sequelize';
import { dataBase } from '../config'

const {userName, DB ,password,puertoDb,host} = dataBase;

const sequelize = new Sequelize(`postgres://${userName}:${password}@${host}:${puertoDb}/${DB}`);

/*
 const sequelize = new Sequelize(
    dataBase.dataBase, //db
    dataBase.userName, //username
    dataBase.password, //password
    {
        host: dataBase.host, //server
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: false
    }
)
*/

export { sequelize };