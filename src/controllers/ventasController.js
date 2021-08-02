import  venta from '../models/venta';
import detalle_ventas from '../models/detalle_ventas'
import producto from '../models/producto'
import initModels from '../models/init-models';
import {sequelize} from '../db/db';

//trae todos las ventas
export async function getVentas(req,res){
    initModels(sequelize);
    try {
        const list_venta = await venta.findAll({
            attributes: ['id_venta','observacion','total','estado','id_parte_diario','id_cliente']
        });
        res.send({
            data: list_venta
        });
    } catch (error) {
        res.send({
            msj: "error al buscar las ventas"
        });
        console.error(error);
    }
    
}

//trae una venta por ID
export async function getVentaById(req,res){
    initModels(sequelize);
    const id= req.params.id;
    try {
        const ventaSeleccionada = await venta.findByPk(id);
        if (ventaSeleccionada == null){
            res.json({
                msj: "no se encontró una venta con la clave proporcionada"
            });
        }
        else{
            res.json({
                data: ventaSeleccionada
            });
        }
    } catch (error) {
        res.send({
            msj: "error al buscar la venta"
        });
        console.error(error);
    }
}

//ingresa ua nueva venta
export async function nuevaVenta(req,res ){
    initModels(sequelize);
    const {observacion,total,estado,id_parte_diario,id_cliente,detalles_venta} = req.body;
    try {
        //todos los ingresos se tienen que dar correctamente -> transaction
        const resultado = await sequelize.transaction(async (t)=>{
                //genero la compra con el total en 0
            const ventaNueva = await venta.create({
                observacion,
                total,
                estado,
                id_parte_diario,
                id_cliente
            },{transaction:t});
            const detalles = [];
            //itero sobre la lista de los detalles para generar los detalles
            for (const detalle of detalles_venta){
                //busco el producto
                    const productoNuevo = await producto.findByPk(detalle.id_producto);
                        //calculo el subtotal
                        const subtotal = productoNuevo.dataValues.precio * detalle.cantidad;
                        try {
                            const detalleNuevo = await detalle_ventas.create({
                                id_producto: detalle.id_producto,
                                id_venta: ventaNueva.id_venta,
                                cantidad:detalle.cantidad,
                                total: subtotal
                            },{transaction:t});
                            //actualizo el monto de la venta en cada insert (trigger)
                            detalles.push(detalleNuevo);
                        } catch (error) {
                            res.send({
                                msj: "error al generar el detalle de la venta"
                            });
                            console.error(error);
                            return;
                        }
            }
            // llamar al commit -> actualizar recaudacion del parte diario
            t.afterCommit(async ()=>{
                const ventaConfirmada = venta.findByPk(ventaNueva.id_venta);
                res.json({
                    msj: "nueva venta ingresada correctamente",
                    data: {
                        operacion: ventaConfirmada,
                        detalle: detalles
                    }
                });
            });
           
            });
    } catch (error) {
        res.send({
            msj: "error al ingresar la nueva venta"
        });
        console.error(error);
    }
    return;
}

//borra una venta por Id
export async function deleteVenta(req,res){
    initModels(sequelize);
    const id = req.params.id  
    try {
        const cantidadBorrada = await venta.destroy({where:{id_venta:id}});
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
            msj: "error al eliminar la venta"
        });
        console.error(error);
    }
}


//actualiza una venta
export async function updateVenta(req,res){
    initModels(sequelize);
    const id = req.params.id;
    const {observacion,total,estado,id_cliente}  = req.body
    try {
        const ventasActualizado = await venta.update({
            observacion,
            total,
            estado,
            id_cliente
        },{
            where: {id_venta:id}
        });
        if(ventasActualizado > 0){
            res.json({
                data: ventasActualizado
            });
        }
        else{
            res.json({
                msj: "no se actualizó ninguna venta"
            });
        }
    } catch (error) {
        res.send({
            msj: "error al actualizar la venta"
        });
        console.error(error);
    }   
}
