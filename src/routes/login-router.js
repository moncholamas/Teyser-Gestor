const {Router} = require('express') ;
const {
    login,
    logup
} = require('../controllers/login-controller') 

//inicilizacion
const router = Router();

//rutas
router.post('/',login);
router.post('/nuevo',logup);

module.exports = router;