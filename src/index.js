const container = require('./startup/container');
const server = container.resolve('app');
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