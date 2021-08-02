import app from './app.js';
import {sequelize} from './db/db.js';
require("babel-core/register");
require("babel-polyfill");

async function main(){
     try {
        const port = process.env.PORT || 3009;
        app.listen(port);
        await sequelize.authenticate();
        console.log(`andando en el puerto ${port}`);
     }catch(e){
         console.log(e);
     }
    
}
main();