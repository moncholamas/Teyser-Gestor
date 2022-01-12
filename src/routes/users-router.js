const  {Router} = require('express');

module.exports = ({UserController}) => {
    //inicilizacion
    const router = Router(); 
    //rutas
    router.get('/', UserController.getAll);

    router.get('/:id', UserController.getById);

    router.post('/', UserController.create);

    router.delete('/:id', UserController.delete);

    router.put('/:id', UserController.update);

    return router;
}



