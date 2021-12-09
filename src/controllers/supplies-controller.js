
//trae todos los equipos
async function getSupplies(req,res,next){
    res.json({msg:'fn'})
}

//trae un equipo por ID
async function getSupplyById(req,res){
    res.json({msg:'fn'})
}

//ingresa un nuevo equipo
async function createSupply(req,res,next){
    res.json({msg:'fn'})
}

//LOS SupplyS NO SE BORRAN SOLO SE CREAN NUEVOS



//actualiza un equipo
async function updateSupply(req,res,next){
    res.json({msg:'fn'})   
}


module.exports = {
    getSupplies,
    getSupplyById,
    createSupply,
    updateSupply
}