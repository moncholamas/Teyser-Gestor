
//trae todas las ventas
async function getSales(req,res,next){
    res.json({msg:'fn'}) 
}

//trae una venta por ID
async function getSaleById(req,res,next){
    res.json({msg:'fn'})
}

//ingresa ua nueva venta
async function createSale(req,res,next){
    res.json({msg:'fn'})
}

//borra una venta por Id
async function deleteSale(req,res,next){
    res.json({msg:'fn'})
}


//LAS VENTAS Y COMPRAS NO SE ACTUALIZAN -> SOLO SE BORRAN Y SE REINGRESAN

module.exports = {
    getSaleById,
    getSales,
    createSale,
    deleteSale
}