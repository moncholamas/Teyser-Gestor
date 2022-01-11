const container = require('./startup/container');
const { json,urlencoded } = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = container.resolve('router');
const db = require('./database/models/index');
const Express = require('express');

const app = Express();

//connection DB
db.sequelize.authenticate();

//middlewares and general router
app
   .use(json())
   .use(cors())
   .use(morgan('combined'))
   .use(urlencoded({extended:false}))
   .use(router);

console.log(router)


module.exports = app;