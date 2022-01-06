const  {Router} = require('express') ;
// const  {} = require('../controllers/users-controller') ;

module.exports = ({UserController}) => {
    //inicilizacion
    const router = Router(); 

    //rutas
    router.get('/', (... args)=> UserController.getAllUsers(...args) );

    // router.get('/:id',
    //                 getUserById);
                    
    // router.delete('/eliminar/:id',
    //                 deleteUser);

    // router.put('/actualizar/:id',
    //                 updateUser);

    return router;
}



