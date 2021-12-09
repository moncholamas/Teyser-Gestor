
//trae todos los Gears
async function getEquipments(req,res,next){
    res.json({msg:'fn'})
}

//trae un Equipment por ID
async function getEquipmentById(req,res,next){
    res.json({msg:'fn'})
}

//ingresa un nuevo Equipment
async function createEquipment(req,res,next){
    res.json({msg:'fn'})
}

//borra un Equipment por Id
async function deleteEquipment(req,res,next){
    res.json({msg:'fn'})
}


//actualiza un Equipment
async function updateEquipment(req,res,next){
    res.json({msg:'fn'})  
}

module.exports = {
    getEquipmentById,
    getEquipments,
    createEquipment,
    deleteEquipment,
    updateEquipment
}