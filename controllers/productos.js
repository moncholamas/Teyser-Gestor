const db = require('../db/db');
const Equipo = require('../db/models');
const mostrarProductos = async ()=>{
    await db.authenticate();
    try {
        await db.sync();
        console.log("se pudo sincronizar");
    } catch (error) {
        console.log(error);
    }
    
    
    const respuesta = await Equipo.findAll({attributes:['nombre']});
    await db.close();
    console.log(respuesta);
    return respuesta;
};

module.exports = mostrarProductos;