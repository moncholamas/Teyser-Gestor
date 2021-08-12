import {Router} from 'express';
import { 
    getClientes,
    getClienteById,
    nuevoCliente,
    deleteCliente,
    updateCliente
} from '../controllers/clientesController';
import {
    isAdminOrOperator, 
    isActive,
    isOperator
} from '../middlewares/authmiddleware';

//inicilizacion
const router = Router();

//rutas
router.get('/',
                isAdminOrOperator,getClientes);

router.get('/:id',
                isAdminOrOperator,getClienteById);
router.post('/nuevo', 
                isAdminOrOperator, nuevoCliente);

router.delete('/eliminar/:id',
                isAdminOrOperator, deleteCliente);

router.put('/actualizar/:id',
                isAdminOrOperator,updateCliente);

export default router;