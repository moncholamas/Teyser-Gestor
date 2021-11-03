import  clientes from '../models/clientes';
import initModels from '../models/init-models';
import {sequelize} from '../db/db';
import { handlerException } from '../helpers/handlerExceptions';

//trae todos los clientes
export async function getClientes(req,res,next){
    initModels(sequelize);
    try {
        const list_clientes = await clientes.findAll({
            attributes: ['id_cliente','nombre','apellido','correo']
        });
        return res.json({
            data: list_clientes
        });
    } catch (error) {
        next(error);
    }
}

//trae un cliente por ID
export async function getClienteById(req,res,next){
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
        next(error);
    }
}

//ingresa un nuevo equipo
export async function nuevoCliente(req,res,next){
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
        next(error);
    }
    
}

//borra un equipo por Id
export async function deleteCliente(req,res,next){
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
        next(error);
    }
}


//actualiza un equipo
export async function updateCliente(req,res,next){
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
        next(error);
    }   
}
