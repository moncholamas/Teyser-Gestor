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

//obtiene todos los productos en sus ultimas versiones
router.get('/',
                isAdminOrOperator,getProductos);

//trae todas las versiones de un solo producto


router.get('/:id',
                isAdminOrOperator,getProductoById);

router.post('/nuevo', 
                isAdmin,nuevoProducto); 

router.delete('/eliminar/:id',
                isAdmin,deleteProducto);

router.put('/actualizar/:id',
                isAdmin,updateProducto);

export default router;