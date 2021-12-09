const {Router} = require('express') ;
const { 
    getCostumers,
    getCostumerById,
    ceateCostumer,
    deleteCostumer,
    updateCostumer
} = require('../controllers/costumers-controller') ;

//inicilizacion
const router = Router();

//rutas
router.get('/',
                getCostumers);

router.get('/:id',
                getCostumerById);
router.post('/nuevo', 
                 ceateCostumer);

router.delete('/eliminar/:id',
                 deleteCostumer);

router.put('/actualizar/:id',
                updateCostumer);

module.exports = router;