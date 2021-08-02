import  pagos from '../models/pagos';
import detalle_compras from '../models/detalle_compras'
import insumos from '../models/insumos'
import initModels from '../models/init-models';
import {sequelize} from '../db/db';

//trae todos las ventas
export async function getPagos(req,res){
    initModels(sequelize);
    try {
        const list_pagos = await pagos.findAll({
            attributes: ['id_compra','tipo','fecha','observacion','total','id_operador']
        });
        res.send({
            data: list_pagos
        });
    } catch (error) {
        res.send({
            msj: "error al buscar los pagos"
        });
        console.error(error);
    }
    
}

//trae una venta por ID
export async function getPagoById(req,res){
    initModels(sequelize);
    const id= req.params.id;
    try {
        const pagoSeleccionada = await pagos.findByPk(id);
        if (pagoSeleccionada == null){
            res.json({
                msj: "no se encontró un pago con la clave proporcionada"
            });
        }
        else{
            res.json({
                data: pagoSeleccionada
            });
        }
    } catch (error) {
        res.send({
            msj: "error al buscar el pago o compra"
        });
        console.error(error);
    }
}

//ingresa ua nueva venta
export async function nuevoPago(req,res ){
    initModels(sequelize);
    const {
            tipo,
            fecha,
            observacion,
            id_operador,
            detalles_pago
    } = req.body;
    try {
        const resultado = sequelize.transaction(async(t)=>{
            const pagoNuevo = await pagos.create({
                tipo,
                fecha,
                observacion,
                total:0,
                id_operador,
            },{transaction:t});
            
            //itero sobre la lista de los detalles para generar los nuevo detalle_compra
            const detalles=[];
            for(const detalle of detalles_pago) {
                //busco los productos
                try {
                    const insumoNuevo = await insumos.findByPk(detalle.id_insumo);
                    if (insumoNuevo == null){
                        console.error("no puede ingresar este insumo");
                        res.send({
                            msj: "error al ingresar un insumo"
                        });
                        return;
                    }
                    else{
                        
                        try {
                            const detalleNuevo = await detalle_compras.create({
                                id_compra: pagoNuevo.id_compra,
                                id_insumo: insumoNuevo.id_insumo,
                                precio:detalle.precio,
                                cantidad: detalle.cantidad
                                //trigger actualiza el monto de la compra efectuada
                            },{transaction:t});
                            detalles.push(detalleNuevo);
                        } catch (error) {
                            res.send({
                                msj: "error al generar un detalle de la compra"
                            });
                            console.error(error);
                            return;
                        }
                    }
                } catch (error) {
                    console.error(error);
                    res.json({
                        msj: "error al generar el pago"
                    })
                }
            }
            t.afterCommit(async ()=>{
                const pagoConfirmado = await pagos.findByPk(pagoNuevo.id_compra);
                res.json({
                    msj: "nuevo pago ingresado correctamente",
                    data: {
                        operacion:pagoConfirmado,
                        detalle: detalles_pago
                    }
                });
            });
        });
        //genero el pago con el total en 0
        
    } catch (error) {
        res.send({
            msj: "error al ingresar el nuevo pago"
        });
        console.error(error);
    }
    return;
}

//borra una venta por Id
export async function deletePago(req,res){
    initModels(sequelize);
    const id = req.params.id  
    try {
        const cantidadBorrada = await pagos.destroy({where:{id_pago:id}});
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
            msj: "error al eliminar el pago o compra"
        });
        console.error(error);
    }
}


//actualiza una venta
export async function updatePago(req,res){
    initModels(sequelize);
    const id = req.params.id;
    const {
            tipo,
            fecha,
            observacion,
            total,
            id_operador,
            detalles_pago
    }  = req.body
    try {
        const pagosActualizado = await pagos.update({
            tipo,
            fecha,
            observacion,
            total,
            id_operador,
            detalles_pago
        },{
            where: {id_pago:id}
        });
        if(pagosActualizado > 0){
            res.json({
                data: pagosActualizado
            });
        }
        else{
            res.json({
                msj: "no se actualizó ningun pago"
            });
        }
    } catch (error) {
        res.send({
            msj: "error al actualizar el pago o compra"
        });
        console.error(error);
    }   
}
