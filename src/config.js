require('dotenv').config();

export const dataBase ={
    DB: process.env.DATA_BASE,
    userName: process.env.USER_NAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    puertoDb: process.env.PUERTODB
};

export const SECRET = process.env.SECRET;

//lista de dominios permitidos para consumir la api
export const configCors = {
    origin: 'http://localhost:3000',
    optionSuccessStatus: 200
}