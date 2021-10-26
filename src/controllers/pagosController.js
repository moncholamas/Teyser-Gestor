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
            attributes: ['id_compra','tipo','total']
        });
        return res.send({
            data: list_pagos
        });
    } catch (error) {
        handlerException(error);
        return res.send({
            msg: "error al buscar los pagos"
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
                msg: `no se encontró un pago con el id ${id}`
            })
            :
            res.json({
                data: pagoSeleccionada //mostrar los detalles asociados
            });
    } catch (error) {
        console.error(error);
        return res.send({
            msg: "error al buscar el pago o compra"
        });
    }
}

//ingresa ua nueva venta
export async function nuevoPago(req,res ){
    initModels(sequelize);
    const {
            tipo,
            observacion,
            detalles_pago
    } = req.body;
    try {
        //los pagos traen una lista de detalles_pago
        await sequelize.transaction(async(t)=>{
            let pagoNuevo;
            pagoNuevo = await pagos.create({
                    tipo,
                    observacion,
                    total:0, //inicializo en 0 un trigger pone el precio real
                    id_operador: req.decoded.id // el id del operador de la sesion actual
                },{transaction:t});

            //una nueva lista de los detalles ingresados en la DB
            const detalleFinal=[];
            for(const detalle of detalles_pago) {
            //itero sobre la lista de los detalles para generar los nuevo detalle_compra
                //busco los productos
                    const insumoNuevo = await insumos.findByPk(detalle.id_insumo);
                    if (insumoNuevo === null){
                        //en caso de que un insumo no exista termino la transaccion
                        throw new Error(`error, no existe un insumo con el id: ${detalle.id_insumo}, compra cancelada`);
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
                    msg: "nuevo pago ingresado correctamente",
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
        if(error.errors !== undefined){
            return res.send({
                msg: error.errors[0].message
            });
        }
        if(error.message!== undefined){
            return res.send({
                msg: error.message
            });
        }
        return res.json({
            msg: "error al ingresa un nuevo pago"
        })
    }
}

//borra una venta por Id
export async function deletePago(req,res){
    initModels(sequelize);
    const id = req.params.id  
    try {
        const cantidadBorrada = await pagos.destroy({where:{id_compra:id}});
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
       console.log(error);
        return res.send({
            msg: "error al eliminar el pago o compra"
        });
    }
}


//LAS VENTAS Y COMPRAS NO SE ACTUALIZAN -> SOLO SE BORRAN Y SE REINGRESAN