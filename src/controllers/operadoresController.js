import  operador from '../models/operador';
import initModels from '../models/init-models';
import {sequelize} from '../db/db';
import { Op } from 'sequelize';

//trae todos los equipos
export async function getOperadores(req,res){
    initModels(sequelize);
    try {
        const idOperadorRequest = req.operadorEncontrado.dataValues.id_operador;
        const list_operador = await operador.findAll({
                attributes: ['id_operador','activo','nombre','apellido'],
                where:{
                    //traigo todos los operadores menos el que hizo el request
                    id_operador:{
                        [Op.ne]: idOperadorRequest
                    }
                }      
            }
        );
        res.send({
            data: list_operador
        });
    } catch (error) {
        res.send({
            msj: "error al buscar los operadores"
        });
        console.error(error);
    }
    
}

//trae un equipo por ID
export async function getOperadorById(req,res){
    initModels(sequelize);
    const id= req.params.id;
    try {
        const operadorSeleccionado = await operador.findByPk(id);
        if (operadorSeleccionado == null){
            res.json({
                msj: "no se encontró un operador con la clave proporcionada"
            });
        }
        else{
            res.json({
                data: operadorSeleccionado
            });
        }
    } catch (error) {
        res.send({
            msj: "error al buscar el operador"
        });
        console.error(error);
    }
}

//ingresa un nuevo equipo
export async function nuevoOperador(req,res ){
    initModels(sequelize);
    const {activo,nombre,apellido,correo,tipo_operador} = req.body;
    try {
        const operadorNuevo = await operador.create(
            {
            activo,
            nombre,
            apellido,
            correo,
            clave: "clave",
            tipo_operador
            },{
    
            }
        );
        res.json({
            msj: "nuevo operador ingresado correctamente",
            data: operadorNuevo
        });
    } catch (error) {
        res.send({
            msj: "error al ingresar el nuevo operador"
        });
        console.error(error);
    }
    
}

//borra un equipo por Id
export async function deleteOperador(req,res){
    initModels(sequelize);
    const id = req.params.id  
    try {
        const cantidadBorrada = await operador.destroy({where:{id_operador:id}});
        cantidadBorrada >0?
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
        res.send({
            msj: "error al eliminar el operador"
        });
        console.error(error);
    }
}


//actualiza un equipo
export async function updateOperador(req,res){
    initModels(sequelize);
    const id = req.params.id;
    const {activo,nombre,apellido,correo,tipo_operador}  = req.body
    try {
        const operadoresActualizado = await operador.update({
            activo,
            nombre,
            apellido,
            correo,
            tipo_operador
        },{
            where: {id_operador:id}
        });
        if(operadoresActualizado > 0){
            res.json({
                msj: "operador actualizado correctamente",
                data: operadoresActualizado
            });
        }
        else{
            res.json({
                msj: "no se actualizó ningún operador"
            });
        }
    } catch (error) {
        res.send({
            msj: "error al actualizar el operador"
        });
        console.error(error);
    }   
}