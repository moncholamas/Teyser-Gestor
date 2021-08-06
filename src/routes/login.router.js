import {Router} from 'express';
import {
    login,
    logup
} from '../controllers/loginController'

//inicilizacion
const router = Router();

//rutas
router.post('/ingreso',login);
router.post('/nuevo',logup);
router.delete('/eliminar/:id');
router.put('/actualizar/:id');

export default router;