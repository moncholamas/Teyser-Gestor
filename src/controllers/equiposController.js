import  equipos from '../models/equipos';
import initModels from '../models/init-models';
import {sequelize} from '../db/db';
import { handlerException } from '../helpers/handlerExceptions';

//trae todos los equipos
export async function getEquipos(req,res,next){
    initModels(sequelize);
    try {
        const list_equipos = await equipos.findAll({
            attributes: ['id_equipo','estado','nombre_tecnico','nombre_fantasia','categoria']
        });
        return res.send({
            data: list_equipos
        });
    } catch (error) {
        next(error);
    }
    
}

//trae un equipo por ID
export async function getEquipoById(req,res,next){
    initModels(sequelize);
    const id= req.params.id;
    try {
        const equipo = await equipos.findByPk(id);
        return equipo === null?
            res.json({
                msg: `no se encontró un equipo con el id: ${id}`
            })
            :
            res.json({
                data: equipo
            });
    } catch (error) {
        next(error);
    }
}

//ingresa un nuevo equipo
export async function nuevoEquipo(req,res,next){
    initModels(sequelize);
    const {estado,nombre_tecnico,nombre_fantasia,categoria} = req.body;
    try {
        const equipoNuevo = await equipos.create(
            {estado,
            nombre_tecnico,
            nombre_fantasia,
            categoria},{}
        );
        return res.json({
            msg: "nuevo equipo ingresado correctamente",
            data: equipoNuevo
        });
    } catch (error) {  
        next(error);
    }
    
}

//borra un equipo por Id
export async function deleteEquipo(req,res,next){
    initModels(sequelize);
    const id = req.params.id  
    try {
        const cantidadBorrada = await equipos.destroy({where:{id_equipo:id}});
        return cantidadBorrada >0?
        res.json({
            msg:"se borro exitosamente",
            data: cantidadBorrada
        })
        :
        res.json({
            msg:"no se encontraron coincidencias",
        })
        ;
    } catch (error) {
        next(error);
    }
}


//actualiza un equipo
export async function updateEquipo(req,res,next){
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
                msg: "equipo actualizado correctamente",
                data: equiposActualizado
            })
            :
            res.json({
                msg: `no se encontraron coincidencias para actualizar con el id: ${id}`
            });
    } catch (error) {
        next(error);
    }   
}