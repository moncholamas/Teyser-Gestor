import {Router} from 'express';
import {
    getPartesDiarios,
    getParteDiarioById,
    nuevoParteDiario,
    deleteParteDiario,
    updateParteDiario
} from '../controllers/parteDiarioController'
import { isAdmin, isAdminOrOperator } from '../middlewares/authmiddleware';

//inicilizacion
const router = Router();

//rutas
router.get('/',
                isAdmin,getPartesDiarios);
router.get('/:id',
                isAdminOrOperator,getParteDiarioById);

router.post('/nuevo',
                isAdminOrOperator, nuevoParteDiario);

router.delete('/eliminar/:id',
                isAdmin,deleteParteDiario);

router.put('/actualizar/:id',
                isAdminOrOperator,updateParteDiario);

export default router;