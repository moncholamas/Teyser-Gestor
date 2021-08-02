import {Router} from 'express';
import {
    getProductos,
    getProductoById,
    nuevoProducto,
    deleteProducto,
    updateProducto
} from '../controllers/productosController'

//inicilizacion
const router = Router();

//rutas
router.get('/',getProductos);
router.get('/:id',getProductoById);
router.post('/nuevo', nuevoProducto); // trigger -> ingresar consumos del producto
router.delete('/eliminar/:id',deleteProducto);
router.put('/actualizar/:id',updateProducto);

export default router;