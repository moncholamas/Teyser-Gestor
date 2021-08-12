import {Router} from 'express';
import {
    getEquipos,
    nuevoEquipo,
    deleteEquipo,
    getEquipoById,
    updateEquipo
} from '../controllers/equiposController';
import {
    isAdminOrOperator, 
    isAdmin
} from '../middlewares/authmiddleware';

//inicilizacion
const router = Router();

//rutas
router.get('/',
                isAdminOrOperator,getEquipos);

router.get('/:id',
                isAdminOrOperator,getEquipoById);

router.post('/nuevo',
                isAdmin,nuevoEquipo);

router.delete('/eliminar/:id',
                isAdmin,deleteEquipo);

router.put('/actualizar/:id',
                isAdmin, updateEquipo);


export default router;