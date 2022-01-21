const  {Router} = require('express');
const validateAuth = require('../middlewares/validateAuth')

module.exports = ({UserController}) => {
    //inicilizacion
    const router = Router(); 
    //rutas
    router.get('/', validateAuth, UserController.getAll);

    router.get('/:id', UserController.getById);

    router.post('/', UserController.create);

    router.delete('/:id', UserController.delete);

    router.put('/:id', UserController.update);

    return router;
}



