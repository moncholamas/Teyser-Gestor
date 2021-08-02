import express, {json, urlencoded} from 'express';
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
import cors from 'cors';

//inicialización
const app = express();

//middlewares

app.use(json());
app.use(urlencoded({extended:false}));
app.use(cors()); //hay que definir la whiteList

app.options('/',cors());
//las rutas indices para los enrutadores
app.use('/equipos', equiposRouter);
app.use('/clientes', clientesRouter);
app.use('/ventas', ventasRouter);
app.use('/insumos', insumosRouter);
app.use('/productos', productosRouter);
app.use('/pagos', pagosRouter);
app.use('/novedades', novedadesRouter);
app.use('/operador', operadorRouter);
app.use('/parte_diario', parteDiarioRouter);

//resolver logica de estadisticas

export default app;