require('dotenv').config();

const dataBase ={
    DB: process.env.DATA_BASE,
    userName: process.env.USER_NAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    puertoDb: process.env.PUERTODB
};

const SECRET = process.env.SECRET;

//lista de dominios permitidos para consumir la api
const configCors = {
    origin: 'http://localhost:3000',
    optionSuccessStatus: 200
}
const PORT = process.env.PORT || 3001;
const APPLICATION_NAME = process.env.NAME_APP || 'probando';

module.exports={
    APPLICATION_NAME,
    PORT,
    dataBase,
    SECRET,
    configCors,
}