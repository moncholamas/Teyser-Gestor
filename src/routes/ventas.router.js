import {Router} from 'express';
import {nuevaVenta,
        getVentas,
        getVentaById,
        deleteVenta,
        updateVenta    
    } from '../controllers/ventasController'
import { isAdminOrOperator } from '../middlewares/authmiddleware';

//inicilizacion
const router = Router();

//rutas
router.get('/',
                isAdminOrOperator,getVentas);

router.get('/:id',
                isAdminOrOperator,getVentaById);

router.post('/nuevo',
                isAdminOrOperator,nuevaVenta); 

router.delete('/eliminar/:id',
                isAdminOrOperator,deleteVenta); 



export default router;