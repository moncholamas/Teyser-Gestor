const { Router,json,urlencoded } = require('express');
const cors = require('cors');
const morgan = require('morgan');


module.exports = ({UserRoutes})=>{
    const router = Router();
    const apiRoutes = Router();

    apiRoutes
        .use(json())
        .use(cors())
        .use(morgan('combined'))
        .use(urlencoded({extended:false}))

    apiRoutes.use('/users', UserRoutes);
    
    //handlerError
    apiRoutes.use((err,req,res,next)=>{
        return res.json({msg:err.message})
    })

    router.use('/api/v1', apiRoutes);
    return router;
}