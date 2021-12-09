
//trae todos los equipos
async function getNews(req,res,next){
    res.json({msg:'fn'})
}

//trae un equipo por ID
async function getNewById(req,res,next){
    res.json({msg:'fn'})
}

//ingresa un nuevo equipo
async function createNew(req,res,next){
    res.json({msg:'fn'})
}

//borra un equipo por Id
async function deleteNew(req,res,next){
    res.json({msg:'fn'})
}


//actualiza un equipo
async function updateNew(req,res,next){
    res.json({msg:'fn'})
}

module.exports = {
    getNewById,
    getNews,
    deleteNew,
    createNew,
    updateNew
}