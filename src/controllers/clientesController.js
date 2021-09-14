import  clientes from '../models/clientes';
import initModels from '../models/init-models';
import {sequelize} from '../db/db';
import { handlerException } from '../helpers/handlerExceptions';

//trae todos los clientes
export async function getClientes(req,res){
    initModels(sequelize);
    try {
        const list_clientes = await clientes.findAll({
            attributes: ['id_cliente','nombre','apellido','telefono','correo']
        });
        return res.json({
            data: list_clientes
        });
    } catch (error) {
        handlerException(error);
        return res.json({
            msj: "error al obtener los clientes"
        });
    }
    
}

//trae un cliente por ID
export async function getClienteById(req,res){
    initModels(sequelize);
    const id= req.params.id;
    try {
        const cliente = await clientes.findByPk(id); 
        return cliente === null?
             res.json({
                msj: "no se encontró cliente con la clave proporcionada"
            })
            :
            res.json({
                data: cliente
            });
    } catch (error) {
        handlerException(error);
        return res.json({
            msj: "error al intentar buscar el cliente"
        });
    }
}

//ingresa un nuevo equipo
export async function nuevoCliente(req,res ){
    initModels(sequelize);
    const {nombre,apellido,telefono,correo} = req.body;
    try {
        const clienteNuevo = await clientes.create(
            {nombre,
            apellido,
            telefono,
            correo},
            {} //no necesita modificadores
        );
        return res.json({
            msj: "nuevo cliente ingresado correctamente",
            data: clienteNuevo
        });
    } catch (error) {
        handlerException(error);
        return res.json({
            msj: "no se pudo ingresar el nuevo cliente"
        });
    }
    
}

//borra un equipo por Id
export async function deleteCliente(req,res){
    initModels(sequelize);
    const id = req.params.id  
    try {
        const cantidadBorrada = await clientes.destroy({where:{id_cliente:id}});
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
        return res.json({
            msj:"error al borrar el cliente",
        });
    }
}


//actualiza un equipo
export async function updateCliente(req,res){
    initModels(sequelize);
    const id = req.params.id;
    const {nombre,apellido,telefono,correo}  = req.body
    try {
        const clientesActualizado = await clientes.update({
            nombre,
            apellido,
            telefono,
            correo
        },{
            where: {id_cliente:id}
        });
        return clientesActualizado > 0?
            res.json({
                msj: "cliente actualizado correctamente",
                data: clientesActualizado
            })
            :
            res.json({
                msj: "no se actualizó ningun cliente"
            });
    } catch (error) {
        handlerException(error);
        return res.json({
            msj: "error al actualizar el cliente"
        });
    }   
}
