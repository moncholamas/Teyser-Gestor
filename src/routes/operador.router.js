import {Router} from 'express';
import {
    getOperadores,
    getOperadorById,
    deleteOperador,
    updateOperador
} from '../controllers/operadoresController';
import { 
    isAdmin, isAdminOrOperator
} from '../middlewares/authmiddleware';

//inicilizacion
const router = Router();

//rutas
router.get('/',
                isAdmin,getOperadores);

router.get('/:id',
                isAdminOrOperator,getOperadorById);
                
router.delete('/eliminar/:id',
                isAdmin,deleteOperador);

router.put('/actualizar/:id',
                isAdmin,updateOperador);

export default router;