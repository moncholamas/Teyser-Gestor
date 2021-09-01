import express, {json, urlencoded} from 'express';
import {configCors} from './config'
//routers
import equiposRouter from './routes/equipos.router';
import clientesRouter from './routes/clientes.router';
import ventasRouter from './routes/ventas.router';
import insumosRouter from './routes/insumos.router';
import novedadesRouter from './routes/novedades.router';
import operadorRouter from './routes/operador.router';
import parteDiarioRouter from './routes/parteDiario.router';
import productosRouter from './routes/productos.router';
import pagosRouter from './routes/pagos.router';
import loginRouter from './routes/login.router';

//middlewares
//// solo algunas rutas necesitan verificar que sea una usuario registrado
import {verifyToken} from './middlewares/authmiddleware'

//cors
import cors from 'cors';

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
//app.use();
app.use('/equipos', verifyToken, equiposRouter);
app.use('/clientes', verifyToken , clientesRouter);
app.use('/ventas', verifyToken, ventasRouter);
app.use('/insumos', verifyToken ,insumosRouter);
app.use('/productos', verifyToken ,productosRouter);
app.use('/pagos', verifyToken ,pagosRouter);
app.use('/novedades', verifyToken ,novedadesRouter);
app.use('/operador', verifyToken ,operadorRouter);
app.use('/parte_diario', verifyToken, parteDiarioRouter);

//resolver logica de estadisticas

export default app;