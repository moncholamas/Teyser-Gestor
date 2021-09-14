//maneja las excepciones segun el entorno (desarrollo o producción)
// desarrollo -> excepciones por consol.log
// produccion -> por correo electronico
require('dotenv').config();

export function handlerException(error){
    if(process.env.ENV==='produccion'){
        console.error(error);
    }else{
        console.log('temandamos un correo');
    }
}