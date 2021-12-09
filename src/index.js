const app = require('./app.js');
const db = require('./database/models/index')

async function main(){
     try {
        const port = process.env.PORT || 3001;
        app.listen(port);
         db.sequelize.authenticate();
        console.log(`servidor corriendo en el puerto: ${port}`);
     }catch(e){
        console.log(e);
     }
}

main();