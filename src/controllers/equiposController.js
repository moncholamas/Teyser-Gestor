import  equipos from '../models/equipos';
import initModels from '../models/init-models';
import {sequelize} from '../db/db';
import { handlerException } from '../helpers/handlerExceptions';

//trae todos los equipos
export async function getEquipos(req,res){
    initModels(sequelize);
    try {
        const list_equipos = await equipos.findAll({
            attributes: ['id_equipo','estado','nombre_tecnico','nombre_fantasia','categoria']
        });
        return res.send({
            data: list_equipos
        });
    } catch (error) {
        handlerException(error);
        return res.send({
            msj: "error al buscar los equipos"
        });
    }
    
}

//trae un equipo por ID
export async function getEquipoById(req,res){
    initModels(sequelize);
    const id= req.params.id;
    try {
        const equipo = await equipos.findByPk(id);
        return equipo === null?
            res.json({
                msj: "no se encontró un equipo con la clave proporcionada"
            })
            :
            res.json({
                data: equipo
            });
    } catch (error) {
        handlerException(error);
        return res.send({
            msj: "error al buscar el equipo"
        });
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
        return res.json({
            msj: "nuevo equipo ingresado correctamente",
            data: equipoNuevo
        });
    } catch (error) {
        handlerException(error);
        return res.send({
            msj: "error al ingresar el nuevo equipo"
        });
    }
    
}

//borra un equipo por Id
export async function deleteEquipo(req,res){
    initModels(sequelize);
    const id = req.params.id  
    try {
        const cantidadBorrada = await equipos.destroy({where:{id_equipo:id}});
        return cantidadBorrada >0?
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
        handlerException(error);
        return res.send({
            msj: "error al borrar el equipo"
        });
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
        return equiposActualizado > 0?
            res.json({
                msj: "equipo actualizado correctamente",
                data: equiposActualizado
            })
            :
            res.json({
                msj: "no se actualizó ningun equipo"
            });
    } catch (error) {
        handlerException(error);
        return res.send({
            msj: "error al actualizar el equipo"
        });
    }   
}