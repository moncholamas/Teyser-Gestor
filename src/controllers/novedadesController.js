import  novedades from '../models/novedades';
import initModels from '../models/init-models';
import {sequelize} from '../db/db';
import { handlerException } from '../helpers/handlerExceptions';

//trae todos los equipos
export async function getNovedades(req,res,next){
    initModels(sequelize);
    try {
        const list_novedades = await novedades.findAll({
            attributes: [
            'id_novedad',    
            'categoria',
            'estado',
            'novedad',]
        });
        return res.send({
            data: list_novedades
        });
    } catch (error) {
        next(error)
    }
}

//trae un equipo por ID
export async function getNovedadById(req,res,next){
    initModels(sequelize);
    const id= req.params.id;
    try {
        const novedad = await novedades.findByPk(id);
        return novedad === null?
            res.json({
                msj: `no se encontró una novedad con el id ${id}`
            })
            :
            res.json({
                data: novedad
            });
    } catch (error) {
        next(error);
    }
}

//ingresa un nuevo equipo
export async function nuevaNovedad(req,res,next){
    initModels(sequelize);
    const {
            categoria,
            estado,
            novedad,
            observacion,
            id_equipo} = req.body;
    try {
        const novedadNuevo = await novedades.create(
            {
            categoria,
            estado,
            novedad,
            observacion,
            id_operador: req.decoded.id, // el id del operador de la sesion actual
            id_equipo
        },{}
        );
        return res.json({
            msj: "nueva novedad ingresada correctamente",
            data: novedadNuevo
        });
    } catch (error) {
        next(error);
    }
    
}

//borra un equipo por Id
export async function deleteNovedad(req,res,next){
    initModels(sequelize);
    const id = req.params.id  
    try {
        const cantidadBorrada = await novedades.destroy({where:{id_novedad:id}});
        return cantidadBorrada >0?
        res.json({
            msj:"se borró exitosamente",
            data: cantidadBorrada
        })
        :
        res.json({
            msj:`no se encontraron coincidencias con el id ${id}`,
        })
        ;
    } catch (error) {
        next(error);
    }
}


//actualiza un equipo
export async function updateNovedad(req,res,next){
    initModels(sequelize);
    const id = req.params.id;
    const {
            categoria,
            estado,
            novedad,
            observacion,
            id_equipo
    }  = req.body
    try {
        const novedadesActualizado = await novedades.update({
            categoria,
            estado,
            novedad,
            observacion,
            id_operador: req.decoded.id, // el id del operador de la sesion actual
            id_equipo
        },{
            where: {id_novedad:id}
        });
        return novedadesActualizado > 0?
            res.json({
                msj: "novedad actualizada correctamente",
                data: novedadesActualizado
            })
            :
            res.json({
                msj: `no se encontraron coincidencias con el id: ${id}`
            });
    } catch (error) {
        next(error);
    }   
}