
//trae todos los Costumers
async function getCostumers(req,res,next){
    res.json({msg:'fn'})
}

//trae un Costumer por ID
async function getCostumerById(req,res,next){
    res.json({msg:'fn'})
}

//ingresa un nuevo equipo
async function createCostumer(req,res,next){
    res.json({msg:'fn'})
}

//borra un equipo por Id
async function deleteCostumer(req,res,next){
    res.json({msg:'fn'})
}


//actualiza un equipo
async function updateCostumer(req,res,next){
    res.json({msg:'fn'})  
}


module.exports = {
    getCostumerById,
    getCostumers,
    deleteCostumer,
    createCostumer,
    updateCostumer
}