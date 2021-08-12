import {Router} from 'express';
import {
    getNovedades,
    getNovedadById,
    deleteNovedad,
    nuevaNovedad,
    updateNovedad
} from '../controllers/novedadesController';
import {
    isAdminOrOperator
} from '../middlewares/authmiddleware';

//inicilizacion
const router = Router();

//rutas
router.get('/',
                isAdminOrOperator,getNovedades);

router.get('/:id',
                isAdminOrOperator,getNovedadById);

router.post('/nuevo',
                isAdminOrOperator, nuevaNovedad);

router.delete('/eliminar/:id',
                isAdminOrOperator,deleteNovedad);

router.put('/actualizar/:id',
                isAdminOrOperator,updateNovedad);

export default router;