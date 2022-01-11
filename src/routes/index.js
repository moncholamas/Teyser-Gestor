const { Router} = require('express');

module.exports = ({UserRoutes})=>{
    const router = Router();
    const apiRoutes = Router();

    //routes
    apiRoutes.use('/users', UserRoutes);
    
    //handlerError
    apiRoutes.use((err,req,res,next)=>{
        if(err) res.json({msg:err.message})
    })

    //general router
    router.use('/api/v1', apiRoutes);
    return router;
}