const express = require('express');
const {json, urlencoded} = require('express');
const {configCors} = require('./config/config');
//routers
const equiposRouter = require('./routes/equipments-router') ;
// const clientesRouter = require('./routes/costumers-router') ;
// const ventasRouter = require('./routes/sales-router') ;
// const insumosRouter = require('./routes/supplies-router') ;
// const novedadesRouter = require('./routes/news-router') ;
// const operadorRouter = require('./routes/users-router') ;
// const productosRouter = require('./routes/products-router') ;
// const pagosRouter = require('./routes/payments-router') ;
const loginRouter = require('./routes/login-router') ;

//middlewares

//cors
const cors = require('cors') ;


//inicialización
const app = express();

//middlewares
app.use(json());
app.use(urlencoded({extended:false}));

// SEGURIDAD 
// dominios autorizados
app.use(cors(configCors));

//solo para el inicio de sesion no requiere una verificacion
app.use('/ingresar', loginRouter)

//necesitan una cuenta verificada
app.use('/equipos', equiposRouter); //


//manejo de errores
// app.use(handlerError);
//
module.exports = app;