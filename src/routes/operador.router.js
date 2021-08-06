import {Router} from 'express';
import {
    getOperadores,
    getOperadorById,
    deleteOperador,
    nuevoOperador,
    updateOperador
} from '../controllers/operadoresController'

//inicilizacion
const router = Router();

//rutas
router.get('/',getOperadores);
router.get('/:id',getOperadorById);
//cada operador crea su cuenta
//router.post('/nuevo', nuevoOperador);
router.delete('/eliminar/:id',deleteOperador);
router.put('/actualizar/:id',updateOperador);

export default router;