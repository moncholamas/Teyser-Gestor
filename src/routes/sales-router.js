const {Router} = require('express') ;
const {
        createSale,
        getSales,
        getSaleById,
        deleteSale,    
    } = require('../controllers/sales-controller') 

//inicilizacion
const router = Router();

//rutas
router.get('/',
                getSales);

router.get('/:id',
                getSaleById);

router.post('/nuevo',
                createSale); 

router.delete('/eliminar/:id',
                deleteSale); 


module.exports = router;