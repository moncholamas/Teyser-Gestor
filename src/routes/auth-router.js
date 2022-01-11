const  {Router} = require('express');

module.exports = ({AuthController}) => {
    //inicilizacion
    const router = Router(); 
    //rutas
    router.post('/login', AuthController.getAuth);

    router.post('/logup', AuthController.setAuth);

    return router;
}
