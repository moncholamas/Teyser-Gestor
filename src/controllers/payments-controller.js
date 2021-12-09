
//trae todos las ventas
async function getPayments(req,res,next){
    res.json({msg:'fn'})
}

//trae una venta por ID
async function getPaymentById(req,res,next){
    res.json({msg:'fn'})
}

//ingresa ua nueva venta
async function createPayment(req,res,next){
    res.json({msg:'fn'})
}

//borra una venta por Id
async function deletePayment(req,res,next){
    res.json({msg:'fn'})
}


//LAS VENTAS Y COMPRAS NO SE ACTUALIZAN -> SOLO SE BORRAN Y SE REINGRESAN

module.exports = {
    getPaymentById,
    getPayments,
    createPayment,
    deletePayment
}