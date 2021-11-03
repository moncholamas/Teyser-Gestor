import  insumos from '../models/insumos';
import initModels from '../models/init-models';
import {sequelize} from '../db/db';
import { handlerException } from '../helpers/handlerExceptions';

//trae todos los equipos
export async function getInsumos(req,res,next){
    initModels(sequelize);
    try {
        const list_insumos = await insumos.findAll({
            attributes: ['id_insumo','unidades','nombre','presentacion']
        });
        return res.send({
            data: list_insumos
        });
    } catch (error) {
        handlerException(error);
        return res.status(400).send({
            msj: "error al buscar los insumos"
        });
    }
}

//trae un equipo por ID
export async function getInsumoById(req,res){
    initModels(sequelize);
    const id= req.params.id;
    try {
        const insumo = await insumos.findByPk(id);
        return insumo === null?
            res.json({
                msj: "no se encontró un insumo con la clave proporcionada"
            })
            :
            res.json({
                data: insumo
            });
    } catch (error) {
        next(error)
    }
}

//ingresa un nuevo equipo
export async function nuevoInsumo(req,res,next){
    initModels(sequelize);
    const {nombre,unidades,presentacion} = req.body;
    try {
        const insumoNuevo = await insumos.create(
            {nombre,
            unidades,
            presentacion
            },{
    
            }
        );
        return res.json({
            msj: "nuevo insumo ingresado correctamente",
            data: insumoNuevo
        });
    } catch (error) {
        next(error);
    }
    
}

//LOS INSUMOS NO SE BORRAN SOLO SE CREAN NUEVOS



//actualiza un equipo
export async function updateInsumo(req,res,next){
    initModels(sequelize);
    const id = req.params.id;
    const {nombre,unidades, presentacion}  = req.body
    try {
        const insumosActualizado = await insumos.update({
            nombre,
            unidades,
            presentacion
        },{
            where: {id_insumo:id}
        });
        return insumosActualizado > 0 ?
            res.json({
                msj: "insumo actualizado correctamente",
                data: insumosActualizado
            })
            :
            res.json({
                msj: "no se actualizó ningún insumo"
            });
    } catch (error) {
        next(error);
    }   
}
