import  novedades from '../models/novedades';
import initModels from '../models/init-models';
import {sequelize} from '../db/db';
import { handlerException } from '../helpers/handlerExceptions';

//trae todos los equipos
export async function getNovedades(req,res){
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
        handlerException(error);
        return res.send({
            msj: "error al buscar las novedades"
        });
    }
}

//trae un equipo por ID
export async function getNovedadById(req,res){
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
        handlerException(error);
        return res.send({
            msj: "error al buscar la novedad"
        });
    }
}

//ingresa un nuevo equipo
export async function nuevaNovedad(req,res ){
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
        handlerException(error);
        if(error.errors !== undefined){
            return res.send({
                msg: error.errors[0].message
            });
        }
        if(error.message!== undefined){
            return res.send({
                msg: error.message
            });
        }
        return res.send({
            msj: "error al ingresar la novedad"
        });
    }
    
}

//borra un equipo por Id
export async function deleteNovedad(req,res){
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
        handlerException(error);
        return res.send({
            msj: "error al eliminar la novedad"
        });
    }
}


//actualiza un equipo
export async function updateNovedad(req,res){
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
        handlerException(error);
        return res.send({
            msj: "error al actualizar la novedad"
        });
    }   
}