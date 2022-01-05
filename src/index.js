const container = require('./startup/container');
const server = container.resolve('Server');
const db = require('./database/models/index');


async function main(){
     try {
      server.start()
      db.sequelize.authenticate();

     }catch(e){
        console.log(e);
     }
}

main();