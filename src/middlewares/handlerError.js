export function handlerError(err,req,res,next){
    console.log(err)
    if(err.errors !== undefined){
        return res.status(400).send({
            msg: err.errors[0].message,
            field: err.errors[0].path
        });
    }
    if(err.message!== undefined){
        return res.status(400).send({
            msg: err.message,
            field: req.field
        });
    }

    
    handlerException(err);
    return res.status(400).json({
        msg: "ocurrió un error en la consulta"
    });
}