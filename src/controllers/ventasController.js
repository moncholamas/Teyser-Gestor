import  ventas from '../models/ventas';
import detalle_ventas from '../models/detalle_ventas';
import initModels from '../models/init-models';
import {sequelize} from '../db/db';
import { handlerException } from '../helpers/handlerExceptions';
import versiones_productos from '../models/versiones_productos';

//trae todas las ventas
export async function getVentas(req,res,next){
    initModels(sequelize);
    try {
        const list_venta = await ventas.findAll({
            attributes: ['id_venta','total','estado']
        });
        return res.send({
            data: list_venta
        });
    } catch (error) {
        next(error);
    }   
}

//trae una venta por ID
export async function getVentaById(req,res,next){
    initModels(sequelize);
    const id= req.params.id;
    try {
        const ventaSeleccionada = await ventas.findOne({where:{id_venta: id},include:[{model:detalle_ventas,as:"detalle_venta"}]});
        return ventaSeleccionada === null?
            res.json({
                msg: `no se encontró una venta con id: ${id}`
            })
            :
            res.json({
                data: ventaSeleccionada
            });
    } catch (error) {
        next(error);
    }
}

//ingresa ua nueva venta
export async function nuevaVenta(req,res,next){
    initModels(sequelize);
    const {observacion,estado,id_cliente,detalles_venta} = req.body;
    try {
        //todos los ingresos se tienen que dar correctamente -> transaction
        await sequelize.transaction(async (t)=>{
            //genero la compra con el total en 0 por seguridad
            //calculo el total en funcion de la DB
            const ventaNueva = await ventas.create({
                observacion,
                total:0,
                estado,
                id_operador: req.decoded.id, // el id del operador de la sesion actual
                id_cliente
            },{transaction:t});

            //creo una lista de detalles ingresados en la DB
            const detalleFinal = [];
            //itero sobre la lista de los detalles para generar los detalles
            for (const detalle of detalles_venta){
                //busco el producto
                    const productoNuevo = await versiones_productos.findByPk(detalle.id_version_producto);
                    if(!productoNuevo){throw new Error(`el producto con el id ${detalle.id_version_producto} no existe`)}
                        //calculo el subtotal
                        const subtotal = productoNuevo.precio * detalle.cantidad;
                        
                        const detalleNuevo = await detalle_ventas.create({
                                id_version_producto: detalle.id_version_producto,
                                id_venta: ventaNueva.id_venta,
                                cantidad:detalle.cantidad,
                                total: subtotal
                        },{transaction:t});

                        //actualizo el monto de la venta en cada insert (desde trigger)
                        detalleFinal.push(detalleNuevo);
            }
            // llamar al commit -> actualizar recaudacion del parte diario
            t.afterCommit(async ()=>{
                const ventaConfirmada = ventas.findByPk(ventaNueva.id_venta);
                return res.json({
                    msg: "nueva venta ingresada correctamente",
                    data: {
                        operacion: ventaConfirmada,
                        detalle: detalleFinal
                    }
                });
            });
           
            });
    } catch (error) {
        next(error);
    }
}

//borra una venta por Id
export async function deleteVenta(req,res,next){
    initModels(sequelize);
    const id = req.params.id  
    try {
        const cantidadBorrada = await ventas.destroy({where:{id_venta:id}});
        return cantidadBorrada >0?
        res.json({
            msg:"se borró exitosamente",
            data: cantidadBorrada
        })
        :
        res.json({
            msg:"no se encontraron coincidencias",
        })
        ;
    } catch (error) {
        next(error);
    }
}


//LAS VENTAS Y COMPRAS NO SE ACTUALIZAN -> SOLO SE BORRAN Y SE REINGRESAN