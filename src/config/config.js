require('dotenv').config();

//lista de dominios permitidos para consumir la api
const configCors = {
    origin: 'http://localhost:3000',
    optionSuccessStatus: 200
}

module.exports={
    APPLICATION_NAME: process.env.NAME_APP,
    PORT: process.env.PORT || 3001,
    SECRET: process.env.SECRET,
    configCors,
}