const { Router} = require('express');

module.exports = ({UserRoutes, AuthRoutes})=>{
    const router = Router();
    const apiRoutes = Router();

    //routes
    apiRoutes.use('/users', UserRoutes);
    apiRoutes.use('/auth', AuthRoutes);
    
    //handlerError
    apiRoutes.use((err,req,res,next)=>{
        console.log(err);
        res.status(err.status||300).json({msg:err.message,body: err.body});
    })

    //general router
    router.use('/api/v1', apiRoutes);
    return router;
}