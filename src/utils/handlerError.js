const status = require('../config/constants/status');
const message = require('../config/constants/message');

const handlerError = (err,req,res,next)=>{
    console.log(err);

    res
        .status(err.status || status.INTERNAL_SERVER_ERROR)
        .json({
            msg:err.message || message.INTERNAL_SERVER_ERROR,
            body: err.body || {}
        });


}

module.exports = handlerError;

