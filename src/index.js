import app from './app.js';
import { sequelize } from './db/db.js';
import { handlerException } from './helpers/handlerExceptions';
import {logger} from './helpers/handlerExceptions'

async function main(){
     try {
        const port = process.env.PORT;
        app.listen(port);
        await sequelize.authenticate();
        logger.info(`servidor corriendo en el puerto: ${port}`);
     }catch(e){
         await handlerException(e);
     }
}

main();