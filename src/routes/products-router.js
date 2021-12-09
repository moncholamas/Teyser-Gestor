const  {Router} = require('express') ;
const  {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/products-controller') 

//inicilizacion
const router = Router();

//rutas

//obtiene todos los products en sus ultimas versiones
router.get('/',
                getProducts);

//trae todas las versiones de un solo product


router.get('/:id',
                getProductById);

router.post('/create', 
                createProduct); 

router.delete('/eliminar/:id',
                deleteProduct);

router.put('/actualizar/:id',
                updateProduct);

module.exports = router;