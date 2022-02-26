const  {Router} = require('express');
const validateAuth = require('../middlewares/validateAuth');
const permission = require('../middlewares/permission')
require('dotenv').config();

module.exports = ({UserController}) => {
    //inicilizacion
    const router = Router(); 
    const ADMIN = process.env.ROL_ADMIN;
    const USER = process.env.ROL_BASIC;
    //rutas
    router
        .get('/', validateAuth, permission([ADMIN]), UserController.getAll)

        .get('/:id', UserController.getById)

        .post('/', UserController.create)

        .delete('/:id', UserController.delete)

        .put('/:id', UserController.update)

    return router;
}
