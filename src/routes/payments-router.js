const {Router} = require('express') ;
const {
    getPayments,
    getPaymentById,
    createPayment,
    deletePayment,
} = require('../controllers/payments-controller');

//inicilizacion
const router = Router();

//rutas
router.get('/',
                getPayments);

router.get('/:id',
                getPaymentById);
router.post('/create',
                 createPayment); 
                
router.delete('/eliminar/:id',
                deletePayment);
                 
module.exports = router;