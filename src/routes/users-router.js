const  {Router} = require('express');

module.exports = ({UserController}) => {
    //inicilizacion
    const router = Router(); 
    //rutas
    router.get('/', UserController.getAllUsers);

    // router.get('/:id',
    //                 getUserById);
                    
    // router.delete('/eliminar/:id',
    //                 deleteUser);

    // router.put('/actualizar/:id',
    //                 updateUser);

    return router;
}



