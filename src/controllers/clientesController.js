import  clientes from '../models/clientes';
import initModels from '../models/init-models';
import {sequelize} from '../db/db';

//trae todos los equipos
export async function getClientes(req,res){
    initModels(sequelize);
    try {
        const list_clientes = await clientes.findAll({
            attributes: ['id_cliente','nombre','apellido','telefono','correo']
        });
        res.json({
            data: list_clientes
        });
    } catch (error) {
        res.json({
            msj: "error al obtener los clientes"
        });
        console.error(error)
    }
    
}

//trae un equipo por ID
export async function getClienteById(req,res){
    initModels(sequelize);
    const id= req.params.id;
    try {
        const cliente = await clientes.findByPk(id); 
        if (cliente == null){
            res.json({
                msj: "no se encontró un cliente con la clave proporcionada"
            });
        }
        else{
            res.json({
                data: cliente
            });
        }
    } catch (error) {
        res.json({
            msj: "error al intentar buscar el cliente"
        });
        console.error(error)
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
            correo},{
    
            }
        );
        res.json({
            msj: "nuevo cliente ingresado correctamente",
            data: clienteNuevo
        });
    } catch (error) {
        console.error(error);
        res.json({
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
        res.json({
            msj:"error al borrar el cliente",
        });
        console.error(error)
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
        if(clientesActualizado > 0){
            res.json({
                data: clientesActualizado
            });
        }
        else{
            res.json({
                msj: "no se actualizó ningun cliente"
            });
        }
    } catch (error) {
        res.json({
            msj: "error al actualizar el cliente"
        });
        console.error(error);
    }   
}
