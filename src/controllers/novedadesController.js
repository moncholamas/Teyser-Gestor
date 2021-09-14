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
            'fecha_actualizacion',
            'categoria',
            'estado',
            'novedad'
            ,'observacion',
            'id_parte_diario',
            'id_equipo']
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
                msj: "no se encontró una novedad con la clave proporcionada"
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
    const {fecha_actualizacion,
            categoria,
            estado,
            novedad,
            observacion,
            id_parte_diario,
            id_equipo} = req.body;
    try {
        const novedadNuevo = await novedades.create(
            {fecha_actualizacion,
            categoria,
            estado,
            novedad,
            observacion,
            id_parte_diario,
            id_equipo
        },{
    
            }
        );
        return res.json({
            msj: "nueva novedad ingresada correctamente",
            data: novedadNuevo
        });
    } catch (error) {
        handlerException(error);
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
            msj:"no se encontraron coincidencias",
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
            fecha_actualizacion,
            categoria,
            estado,
            novedad,
            observacion,
            id_parte_diario,
            id_equipo
    }  = req.body
    try {
        const novedadesActualizado = await novedades.update({
            fecha_actualizacion,
            categoria,
            estado,
            novedad,
            observacion,
            id_parte_diario,
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
                msj: "no se actualizó ninguna novedad"
            });
    } catch (error) {
        handlerException(error);
        return res.send({
            msj: "error al actualizar la novedad"
        });
    }   
}