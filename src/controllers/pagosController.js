import  pagos from '../models/pagos';
import detalle_compras from '../models/detalle_compras'
import insumos from '../models/insumos'
import initModels from '../models/init-models';
import {sequelize} from '../db/db';
import { handlerException } from '../helpers/handlerExceptions';

//trae todos las ventas
export async function getPagos(req,res){
    initModels(sequelize);
    try {
        const list_pagos = await pagos.findAll({
            attributes: ['id_compra','tipo','observacion','total','id_operador']
        });
        return res.send({
            data: list_pagos
        });
    } catch (error) {
        console.error(error);
        return res.send({
            msj: "error al buscar los pagos"
        });
    }
}

//trae una venta por ID
export async function getPagoById(req,res){
    initModels(sequelize);
    const id= req.params.id;
    try {
        const pagoSeleccionada = await pagos.findByPk(id);
        return pagoSeleccionada === null?
            res.json({
                msj: "no se encontró un pago con la clave proporcionada"
            })
            :
            res.json({
                data: pagoSeleccionada
            });
    } catch (error) {
        console.error(error);
        return res.send({
            msj: "error al buscar el pago o compra"
        });
    }
}

//ingresa ua nueva venta
export async function nuevoPago(req,res ){
    initModels(sequelize);
    const {
            tipo,
            observacion,
            id_operador,
            detalles_pago
    } = req.body;
    try {
        //los pagos traen una lista de detalles_pago
        sequelize.transaction(async(t)=>{
            const pagoNuevo = await pagos.create({
                tipo,
                observacion,
                total:0,
                id_operador,
            },{transaction:t});
            
            //una nueva lista de los detalles ingresados en la DB
            const detalleFinal=[];
            for(const detalle of detalles_pago) {
            //itero sobre la lista de los detalles para generar los nuevo detalle_compra
                //busco los productos
                    const insumoNuevo = await insumos.findByPk(detalle.id_insumo);
                    if (insumoNuevo == null){
                        console.error("no puede ingresar este insumo");
                        return res.send({
                            msj: "error al ingresar un insumo, compra cancelada"
                        });
                    }
                    else{
                            const detalleNuevo = await detalle_compras.create({
                                id_compra: pagoNuevo.id_compra,
                                id_insumo: insumoNuevo.id_insumo,
                                precio:detalle.precio,
                                cantidad: detalle.cantidad
                                //trigger actualiza el monto de la compra efectuada
                            },{transaction:t});
                            detalleFinal.push(detalleNuevo);
                    }
            }
            //terminada la transaccion envio los datos al front
            t.afterCommit(async ()=>{
                const pagoConfirmado = await pagos.findByPk(pagoNuevo.id_compra);
                return res.json({
                    msj: "nuevo pago ingresado correctamente",
                    data: {
                        operacion:pagoConfirmado,
                        detalle: detalleFinal
                    }
                });
            });
        });
        //genero el pago con el total en 0
        
    } catch (error) {
        handlerException(error);
        return res.send({
            msj: "error al ingresar el nuevo pago"
        });
        
    }
}

//borra una venta por Id
export async function deletePago(req,res){
    initModels(sequelize);
    const id = req.params.id  
    try {
        const cantidadBorrada = await pagos.destroy({where:{id_pago:id}});
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
        return res.send({
            msj: "error al eliminar el pago o compra"
        });
    }
}


//LAS VENTAS Y COMPRAS NO SE ACTUALIZAN -> SOLO SE BORRAN Y SE REINGRESAN