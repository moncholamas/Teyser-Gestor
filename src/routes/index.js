const { Router,json,urlencoded } = require('express');
const cors = require('cors');



module.exports = ({UserRoutes})=>{
    const router = Router();
    const apiRoutes = Router();

    apiRoutes
        .use(json())
        .use(cors())
        .use(urlencoded({extended:false}))

    apiRoutes.use('/users', UserRoutes)

    router.use('/api/v1', apiRoutes);
    return router;
}