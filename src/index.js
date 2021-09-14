import app from './app.js';
import { sequelize } from './db/db.js';
import { handlerException } from './helpers/handlerExceptions'


async function main(){
     try {
        const port = process.env.PORT || 3009;
        app.listen(port);
        await sequelize.authenticate();
        console.log(`servidor corriendo en el puerto: ${port}`);
     }catch(e){
         handlerException(e);
     }
}

main();