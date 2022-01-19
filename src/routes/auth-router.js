const  {Router} = require('express');
const {validateAuth} = require('../middlewares/validations/auth-validation');

module.exports = ({AuthController}) => {
    //inicilizacion
    const router = Router(); 
    //rutas
    router.post('/login', validateAuth, AuthController.getAuth);

    router.post('/logup', validateAuth, AuthController.setAuth);

    return router;
}
