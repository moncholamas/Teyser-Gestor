import  clientes from '../models/clientes';
import initModels from '../models/init-models';
import {sequelize} from '../db/db';
import { handlerException } from '../helpers/handlerExceptions';

//trae todos los clientes
export async function getClientes(req,res){
    initModels(sequelize);
    try {
        const list_clientes = await clientes.findAll({
            attributes: ['id_cliente','nombre','apellido','correo']
        });
        return res.json({
            data: list_clientes
        });
    } catch (error) {
        handlerException(error);
        return res.status(400).json({
            msg: "error al obtener los clientes"
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
                msg: `no se encontró cliente con el id: ${id}`
            })
            :
            res.json({
                data: cliente
            });
    } catch (error) {
        handlerException(error);
        return res.status(400).json({
            msg: "error al intentar buscar el cliente"
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
            msg: "nuevo cliente ingresado correctamente",
            data: clienteNuevo
        });
    } catch (error) {
        if(error.errors!== undefined){
            return res.send({
                msg: error.errors[0].message
            });
        }

        handlerException(error);
        return res.json({
            msg: "error ingresar el nuevo cliente"
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
            msg:"se borró exitosamente",
            data: cantidadBorrada
        })
        :
        res.json({
            msg: `no se encontraron coincidencias para borrar con el id: ${id}`,
        })
        ;
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError'){
            return res.json({
                msg: "error, el cliente se encuentra asociado a ventas realizadas"
            });
        }

        handlerException(error);
        return res.json({
            msg: "error al intentar borrar un cliente"
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
                msg: "cliente actualizado correctamente",
                data: clientesActualizado
            })
            :
            res.json({
                msg: `no se encontraron coincidencias para actualizar con el id: ${id}`
            });
    } catch (error) {
        handlerException(error);
        return res.status(400).json({
            msg: "error al actualizar el cliente"
        });
    }   
}
