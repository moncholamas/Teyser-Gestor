import {Router} from 'express';
import {
    getNovedades,
    getNovedadById,
    deleteNovedad,
    nuevaNovedad,
    updateNovedad
} from '../controllers/novedadesController'

//inicilizacion
const router = Router();

//rutas
router.get('/',getNovedades);
router.get('/:id',getNovedadById);
router.post('/nuevo', nuevaNovedad);
router.delete('/eliminar/:id',deleteNovedad);
router.put('/actualizar/:id',updateNovedad);
export default router;