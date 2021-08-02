import {Router} from 'express';
import {
    getInsumos,
    getInsumoById,
    nuevoInsumo,
    deleteInsumo,
    updateInsumo
} from '../controllers/insumosController'

//inicilizacion
const router = Router();

//rutas
//rutas
router.get('/',getInsumos);
router.get('/:id',getInsumoById);
router.post('/nuevo',nuevoInsumo);
router.delete('/eliminar/:id',deleteInsumo);
router.put('/actualizar/:id',updateInsumo);

export default router;