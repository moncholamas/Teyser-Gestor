const {UserService} = require('../services/user-service')

//trae todos los equipos
async function getUsers(req,res,next){
    const allUsers = await UserService.getAll();

    res.json({msg:allUsers});
}

//trae un equipo por ID
async function getUserById(req,res,next){
    res.json({msg:'fn'})
}


//borra un User por Id
async function deleteUser(req,res,next){
    res.json({msg:'fn'})
}


//actualiza un User
async function updateUser(req,res,next){
    res.json({msg:'fn'}) 
}

module.exports = {
    getUserById,
    getUsers,
    deleteUser,
    updateUser
}