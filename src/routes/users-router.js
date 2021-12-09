const  {Router} = require('express') ;
const  {
    getUsers,
    getUserById,
    deleteUser,
    updateUser
} = require('../controllers/users-controller') ;

//inicilizacion
const router = Router();

//rutas
router.get('/',
                getUsers);

router.get('/:id',
                getUserById);
                
router.delete('/eliminar/:id',
                deleteUser);

router.put('/actualizar/:id',
                updateUser);

module.exports = router;