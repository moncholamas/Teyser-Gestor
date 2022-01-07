const  {Router} = require('express');

module.exports = ({UserController}) => {
    //inicilizacion
    const router = Router(); 
    //rutas
    router.get('/', UserController.getAllUsers);

    router.get('/:id', UserController.getUser);

    router.post('/', UserController.createUser);

    router.delete('/:id', UserController.deleteUser);

    router.put('/:id', UserController.updateUser);

    return router;
}



