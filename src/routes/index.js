const { Router} = require('express');

module.exports = ({UserRoutes, AuthRoutes})=>{
    const router = Router();
    const apiRoutes = Router();

    //routes
    apiRoutes.use('/users', UserRoutes);
    apiRoutes.use('/auth', AuthRoutes);
    
    //handlerError
    apiRoutes.use((err,req,res,next)=>{
        console.error(err)
        if(err) res.json({msg:err.message})
    })

    //general router
    router.use('/api/v1', apiRoutes);
    return router;
}