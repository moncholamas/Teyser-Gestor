import  equipos from '../models/equipos';
import initModels from '../models/init-models';
import {sequelize} from '../db/db';

//trae todos los equipos
export async function getEquipos(req,res){
    initModels(sequelize);
    try {
        const list_equipos = await equipos.findAll({
            attributes: ['id_equipo','estado','nombre_tecnico','nombre_fantasia','categoria']
        });
        res.send({
            data: list_equipos
        });
    } catch (error) {
        res.send({
            msj: "error al buscar los equipos"
        });
        console.log(error);
    }
    
}

//trae un equipo por ID
export async function getEquipoById(req,res){
    initModels(sequelize);
    const id= req.params.id;
    try {
        const equipo = await equipos.findByPk(id);
        if (equipo == null){
            res.json({
                msj: "no se encontró un equipo con la clave proporcionada"
            });
        }
        else{
            res.json({
                data: equipo
            });
        }
    } catch (error) {
        res.send({
            msj: "error al buscar el equipo"
        });
        console.error(error);
    }
}

//ingresa un nuevo equipo
export async function nuevoEquipo(req,res ){
    initModels(sequelize);
    const {estado,nombre_tecnico,nombre_fantasia,categoria} = req.body;
    try {
        const equipoNuevo = await equipos.create(
            {estado,
            nombre_tecnico,
            nombre_fantasia,
            categoria},{
    
            }
        );
        res.json({
            msj: "nuevo equipo ingresado correctamente",
            data: equipoNuevo
        });
    } catch (error) {
        res.send({
            msj: "error al ingresar el nuevo equipo"
        });
        console.error(error)
    }
    
}

//borra un equipo por Id
export async function deleteEquipo(req,res){
    initModels(sequelize);
    const id = req.params.id  
    try {
        const cantidadBorrada = await equipos.destroy({where:{id_equipo:id}});
        cantidadBorrada >0?
        res.json({
            msj:"se borro exitosamente",
            data: cantidadBorrada
        })
        :
        res.json({
            msj:"no se encontraron coincidencias",
        })
        ;
    } catch (error) {
        res.send({
            msj: "error al borrar el equipo"
        });
        console.error(error);
    }
}


//actualiza un equipo
export async function updateEquipo(req,res){
    initModels(sequelize);
    const id = req.params.id;
    const {estado,nombre_fantasia,nombre_tecnico,categoria} = req.body
    try {
        const equiposActualizado = await equipos.update({
            estado,
            nombre_fantasia,
            nombre_tecnico,
            categoria
        },{
            where: {id_equipo:id}
        });
        if(equiposActualizado > 0){
            res.json({
                msj: "equipo actualizado correctamente",
                data: equiposActualizado
            });
        }
        else{
            res.json({
                msj: "no se actualizó ningun equipo"
            });
        }
    } catch (error) {
        res.send({
            msj: "error al actualizar el equipo"
        });
        console.error(error);
    }   
}