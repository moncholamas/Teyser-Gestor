const  {Router} = require('express');
const { authSchema, authUpSchema } = require('../middlewares/validations/auth-schema');

module.exports = ({AuthController}) => {
    //inicilizacion
    const router = Router(); 
    //rutas
    router.post('/login', authSchema, AuthController.getAuth);

    router.post('/logup', authUpSchema, AuthController.setAuth);

    return router;
}
