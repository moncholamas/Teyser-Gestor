import  operador from '../models/operador';
import initModels from '../models/init-models';
import {sequelize} from '../db/db';
import { Op } from 'sequelize';

//trae todos los equipos
export async function getOperadores(req,res){
    initModels(sequelize);
    try {
        //traigo todos los operadores menos el que hizo el request
        const idOperadorRequest = req.operadorEncontrado.dataValues.id_operador;
        const list_operador = await operador.findAll({
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
        console.error(error);
        return res.send({
            msj: "error al buscar los operadores"
        });
    }
    
}

//trae un equipo por ID
export async function getOperadorById(req,res){
    initModels(sequelize);
    const id= req.params.id;
    try {
        //traigo todos los datos del operador menos la clave
        const operadorSeleccionado = await operador.findByPk(id,{
            attributes:{
                exclude: ['clave']
            }
        });
        return operadorSeleccionado === null?
            res.json({
                msj: "no se encontró un operador con la clave proporcionada"
            })
            :
            res.json({
                data: operadorSeleccionado
            });
    } catch (error) {
        console.error(error);
        res.send({
            msj: "error al buscar el operador"
        });
    }
}


//borra un operador por Id
export async function deleteOperador(req,res){
    initModels(sequelize);
    const id = req.params.id  
    try {
        const cantidadBorrada = await operador.destroy({where:{id_operador:id}});
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
        console.error(error);
        return res.send({
            msj: "error al eliminar el operador"
        });
    }
}


//actualiza un operador
export async function updateOperador(req,res){
    initModels(sequelize);
    const id = req.params.id;
    const {activo,tipo_operador}  = req.body
    try {
        const operadoresActualizado = await operador.update({
            activo,
            tipo_operador
        },{
            where: {id_operador:id}
        });
        return operadoresActualizado > 0?
            res.json({
                msj: "operador actualizado correctamente",
                data: operadoresActualizado
            })
            :
            res.json({
                msj: "no se actualizó ningún operador"
            });
    } catch (error) {
        console.error(error);
        return res.send({
            msj: "error al actualizar el operador"
        });
    }   
}