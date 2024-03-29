import  operadores from '../models/operadores';
import initModels from '../models/init-models';
import {sequelize} from '../db/db';
import { Op } from 'sequelize';
import { handlerException } from '../helpers/handlerExceptions';

//trae todos los equipos
export async function getOperadores(req,res,next){
    initModels(sequelize);
    try {
        //traigo todos los operadores menos el que hizo el request
        const idOperadorRequest = req.operadorEncontrado.dataValues.id_operador;
        const list_operador = await operadores.findAll({
                attributes: ['id_operador','activo','nombre','apellido'],
                where:{
                    id_operador:{
                        [Op.ne]: idOperadorRequest
                    }
                }      
            }
        );
        return res.send({
            data: list_operador
        });
    } catch (error) {
        next(error);
    }
    
}

//trae un equipo por ID
export async function getOperadorById(req,res,next){
    initModels(sequelize);
    const id= req.params.id;
    try {
        //traigo todos los datos del operador menos la clave
        const operadorSeleccionado = await operadores.findByPk(id,{
            attributes:{
                exclude: ['clave']
            }
        });
        return operadorSeleccionado === null?
            res.json({
                msg: `no se encontró un operador con el id ${id}`
            })
            :
            res.json({
                data: operadorSeleccionado
            });
    } catch (error) {
        next(error);
    }
}


//borra un operador por Id
export async function deleteOperador(req,res,next){
    initModels(sequelize);
    const id = req.params.id  
    try {
        const cantidadBorrada = await operadores.destroy({where:{id_operador:id}});
        return cantidadBorrada >0?
        res.json({
            msg:"se borró exitosamente",
            data: cantidadBorrada
        })
        :
        res.json({
            msg: `no se encontraron coincidencias con el id ${id}`,
        })
        ;
    } catch (error) {
        next(error);
    }
}


//actualiza un operador
export async function updateOperador(req,res,next){
    initModels(sequelize);
    const id = req.params.id;
    const {activo,tipo_operador}  = req.body
    try {
        //solo permite actualizar el tipo de operador y el estado
        const operadoresActualizado = await operadores.update({
            activo,
            tipo_operador
        },{
            where: {id_operador:id}
        });
        return operadoresActualizado > 0?
            res.json({
                msg: "operador actualizado correctamente",
                data: operadoresActualizado
            })
            :
            res.json({
                msg: `no se encontraron coincidencias con el id ${id}`
            });
    } catch (error) {
        next(error);
    }   
}