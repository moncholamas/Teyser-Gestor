import {Router} from 'express';
import {
    login,
    logup
} from '../controllers/loginController'

//inicilizacion
const router = Router();

//rutas
router.post('/',login);
router.post('/nuevo',logup);

export default router;