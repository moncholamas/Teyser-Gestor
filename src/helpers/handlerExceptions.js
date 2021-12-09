//maneja las excepciones segun el entorno (desarrollo o producción)
// desarrollo -> excepciones por consol.log
const { transporter } = require('../helpers/mailer') 
// produccion -> por correo electronico
require('dotenv').config();
const log4js = require("log4js");
const logger = log4js.getLogger();
//import {transporter} from './mailer';


logger.level = "debug";

async function handlerException(error){
    const errorText = JSON.stringify(error);

    if(process.env.ENV==='DEV'){
        logger.error(errorText);
        
    }else{
        //logger.error(error);
        const currentTime = new Date(Date.now());
        try {
            logger.error(errorText);
            await transporter.sendMail({
                from: '"BackEnd Error" <soporte@teyser.com>', // sender address
                to: "moncholamas@gmail.com", // list of receivers
                subject: "Ocurrió una excepción en Teyser", // Subject line
                html: `<h3>Excepción: ${error.name} </h3> 
                <p> ${error} </p> <p>Fecha y hora del error: ${currentTime.toUTCString()}</p>`
              });
              logger.info('Error notificado al correo: ', process.env.MAIL);
        } catch (error) {
            logger.error('No se puede notificar al administrador del error, contactar manualmente.')
            logger.fatal(error);
        }
        
    }
}

module.exports = {
    handlerException,
    logger
}