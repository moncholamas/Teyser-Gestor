import {Router} from 'express';
import {nuevaVenta,
        getVentas,
        getVentaById,
        deleteVenta,
        updateVenta    
    } from '../controllers/ventasController'

//inicilizacion
const router = Router();

//rutas
router.get('/',getVentas);
router.get('/:id',getVentaById);
router.post('/nuevo',nuevaVenta); //generar trigger -> actualizar stock
router.delete('/eliminar/:id',deleteVenta); //generar trigger -> borrar previamente los detalle_venta
router.put('/actualizar/:id',updateVenta); //definir que se puede actualizar de la venta

export default router;