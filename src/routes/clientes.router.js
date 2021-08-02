import {Router} from 'express';
import { getClientes,
        getClienteById,
        nuevoCliente,
        deleteCliente,
        updateCliente
    } from '../controllers/clientesController';


//inicilizacion
const router = Router();

//rutas
router.get('/',getClientes);
router.get('/:id',getClienteById);
router.post('/nuevo', nuevoCliente);
router.delete('/eliminar/:id',deleteCliente);
router.put('/actualizar/:id',updateCliente);

export default router;