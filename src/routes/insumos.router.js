import {Router} from 'express';
import {
    getInsumos,
    getInsumoById,
    nuevoInsumo,
    deleteInsumo,
    updateInsumo
} from '../controllers/insumosController'
import {
    isAdminOrOperator, 
    isAdmin
} from '../middlewares/authmiddleware';
//inicilizacion
const router = Router();

//rutas
//rutas
router.get('/',
                isAdmin,getInsumos);

router.get('/:id',
                isAdmin,getInsumoById);

router.post('/nuevo',
                isAdmin,nuevoInsumo);

router.delete('/eliminar/:id',
                isAdmin,deleteInsumo);

router.put('/actualizar/:id',
                isAdmin,updateInsumo);

export default router;