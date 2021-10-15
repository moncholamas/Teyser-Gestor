import Sequelize from 'sequelize';
import { dataBase } from '../config'

const {userName, DB ,password,puertoDb,host} = dataBase;


const sequelize = new Sequelize({
    database: DB,
    username: userName,
    password,
    host,
    port: puertoDb,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // <<<<<<< YOU NEED THIS
      }
    },
  });

export { sequelize };