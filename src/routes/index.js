const { Router} = require('express');
const handlerError = require('../utils/handlerError');

module.exports = ({UserRoutes, AuthRoutes})=>{
    const router = Router();
    const apiRoutes = Router();

    //routes
    apiRoutes.use('/users', UserRoutes);
    apiRoutes.use('/auth', AuthRoutes);
    
    //handlerError
    apiRoutes.use(handlerError)

    //general router
    router.use('/api/v1', apiRoutes);
    return router;
}