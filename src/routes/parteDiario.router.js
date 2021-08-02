import {Router} from 'express';
import {
    getPartesDiarios,
    getParteDiarioById,
    nuevoParteDiario,
    deleteParteDiario,
    updateParteDiario
} from '../controllers/parteDiarioController'

//inicilizacion
const router = Router();

//rutas
router.get('/',getPartesDiarios);
router.get('/:id',getParteDiarioById);
router.post('/nuevo', nuevoParteDiario);
router.delete('/eliminar/:id',deleteParteDiario);
router.put('/actualizar/:id',updateParteDiario);

export default router;