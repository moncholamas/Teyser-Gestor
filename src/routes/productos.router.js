import {Router} from 'express';
import {
    getProductos,
    getProductoById,
    nuevoProducto,
    deleteProducto,
    updateProducto
} from '../controllers/productosController'
import { isAdmin, isAdminOrOperator } from '../middlewares/authmiddleware';

//inicilizacion
const router = Router();

//rutas
router.get('/',
                isAdminOrOperator,getProductos);

router.get('/:id',
                isAdminOrOperator,getProductoById);

router.post('/nuevo', 
                isAdmin,nuevoProducto); 

router.delete('/eliminar/:id',
                isAdmin,deleteProducto);

router.put('/actualizar/:id',
                isAdmin,updateProducto);

export default router;