//maneja las excepciones segun el entorno (desarrollo o producción)
// desarrollo -> excepciones por consol.log
// produccion -> por correo electronico
require('dotenv').config();
const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";

export {logger};


export function handlerException(error){
    if(process.env.ENV==='produccion'){
        logger.error(error);
    }else{
        logger.error(error);
        //implementar el envio del log al correo con NODEMAILER
    }
}