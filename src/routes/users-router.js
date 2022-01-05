const  {Router} = require('express') ;
// const  {} = require('../controllers/users-controller') ;

module.exports = ({UserService}) => {
    //inicilizacion
    const router = Router();

    //rutas
    router.get('/', async(req,res,next) =>{
        const users = await UserService.getAll();
        res.json({ms: users})
    });

    // router.get('/:id',
    //                 getUserById);
                    
    // router.delete('/eliminar/:id',
    //                 deleteUser);

    // router.put('/actualizar/:id',
    //                 updateUser);

    return router;
}



