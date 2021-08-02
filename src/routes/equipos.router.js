import {Router} from 'express';
import {getEquipos,
        nuevoEquipo,
        deleteEquipo,
        getEquipoById,
        updateEquipo
    } from '../controllers/equiposController'

//inicilizacion
const router = Router();

//rutas
router.get('/',getEquipos);
router.get('/:id',getEquipoById);
router.post('/nuevo',nuevoEquipo);
router.delete('/eliminar/:id',deleteEquipo);
router.put('/actualizar/:id',updateEquipo);


export default router;