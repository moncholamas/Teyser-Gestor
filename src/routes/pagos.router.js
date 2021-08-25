import {Router} from 'express';
import {
    getPagos,
    getPagoById,
    nuevoPago,
    deletePago,
} from '../controllers/pagosController'
import { isAdmin } from '../middlewares/authmiddleware';

//inicilizacion
const router = Router();

//rutas
router.get('/',
                isAdmin,getPagos);

router.get('/:id',
                isAdmin,getPagoById);
router.post('/nuevo',
                isAdmin, nuevoPago); 
                
router.delete('/eliminar/:id',
                isAdmin,deletePago);
                 
export default router;