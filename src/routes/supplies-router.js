const {Router} = require('express') ;
const {
    getSupplies,
    getSupplyById,
    createSupply,
    updateSupply
} = require('../controllers/supplies-controller'); 

//inicilizacion
const router = Router();

//rutas
//rutas
router.get('/',
                getSupplies);

router.get('/:id',
                getSupplyById);

router.post('/nuevo',
                createSupply);

router.put('/actualizar/:id',
                updateSupply);

module.exports = router;