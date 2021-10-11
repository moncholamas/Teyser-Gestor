import  productos from '../models/productos';
import versiones_productos from '../models/versiones_productos';
import  insumos from '../models/insumos';
import  consumos from '../models/consumos';
import initModels from '../models/init-models';
import {sequelize} from '../db/db';
import { handlerException } from '../helpers/handlerExceptions';

//trae todos los productos (activos y ultima version, precio actualizado)
export async function getProductos(req,res){
    initModels(sequelize);
    try {
        const list_productos = await productos.findAll({
            attributes: ['id_producto','nombre','descripcion','categoria']
        });
        //TRAER ASOCIADAS LAS ULTIMAS VERSIONES DE CADA PRODUCTO
            //FUNCION DE LA BD

        return res.send({
            data: list_productos
        });
    } catch (error) {
        handlerException(error);
        return res.send({
            msj: "error al buscar los productos"
        });
    }
}

//trae un equipo por ID
export async function getProductoById(req,res){
    initModels(sequelize);
    const id= req.params.id;
    try {
        const productoEncontrado = await productos.findByPk(id,{include:[{model:versiones_productos,as:"versiones_productos"}]});
        return productoEncontrado == null?
            res.json({
                msj: "no se encontró un producto con la clave proporcionada"
            })
            :
            res.json({
                data: productoEncontrado,
            });
    } catch (error) {
        console.log(error);
        return res.send({
            msj: "error al buscar el producto"
        });
    }
}

//ingresa un nuevo producto
export async function nuevoProducto(req,res ){
    initModels(sequelize);
    const {nombre,descripcion,precio,categoria,detalle_insumos} = req.body;
    try {
        //todo se tiene que cargar completamente -> transaction
        const resul = sequelize.transaction(async (t)=>{
            //recibe un arreglo con los insumos y la cantidad que consume de c/u
            const productoNuevo = await productos.create(
                {nombre,
                descripcion,
                categoria},
                {transaction:t}
            );
            
            //por cada insumo actualiza la tabla consumos para este producto
            for(const insumo of detalle_insumos){
                const nuevoInsumo = await insumos.findByPk(insumo.id_insumo);
                if(nuevoInsumo == null){
                    return res.json({
                        msj:"no se encontró ningun insumo con la clave ingresada, carga de producto terminada"
                    });
                }else{
                    //actualiza la tabla consumos
                        await consumos.create({
                            id_producto: productoNuevo.id_producto,
                            id_insumo: insumo.id_insumo,
                            cantidad: insumo.cantidad
                        },{transaction:t});  
                }
            }

            //Instancio la primera versión del producto con el precio base
            const version = await versiones_productos.create({
                precio,
                id_producto: productoNuevo.id_producto
            },{transaction:t});

            t.afterCommit(()=>{
                //terminada la transaccion confirma el ingreso
                return res.json({
                    msj: "nuevo producto ingresado correctamente",
                    data: {
                        producto:productoNuevo,
                        version
                    }

                });
            });
        });
        
    } catch (error) {
        handlerException(error);
        return res.send({
            msj: "error al ingresar el nuevo producto"
        });
    }
}

//borra un producto por Id
//Un producto solo se puede borrar SI NO ESTA EN NINGUNA VENTA
export async function deleteProducto(req,res){
    initModels(sequelize);
    const id = parseInt(req.params.id);
    try {
        const cantidadBorrada = await productos.destroy({where:{id_producto:id}});
        return cantidadBorrada >0?
        res.json({
            msj:"se borró exitosamente",
            data: cantidadBorrada
        })
        :
        res.json({
            msj:"no se encontraron coincidencias",
            id: id
        })
        ;
    } catch (error) {
        handlerException(error);
        return res.send({
            msj: "error al borrar el producto"
        });
    }
}

//AUDITAR LOS CAMBIOS DE PRODUCTO
//actualiza un producto -> si un producto tiene que cambiar sus insumos se debe eliminar
export async function updateProducto(req,res){
    initModels(sequelize);
    const id = req.params.id;
    const {nombre,descripcion,precio,categoria}  = req.body
    try {
        const productosActualizado = await productos.update({
            nombre,
            descripcion,
            precio,
            categoria
        },{
            where: {id_producto:id}
        });
        return productosActualizado > 0?
            res.json({
                msj: "se ha actualizado correctamente",
                data: productosActualizado
            })
            :
            res.json({
                msj: "no se actualizó ningún producto"
            });
    } catch (error) {
        handlerException(error);
        return res.send({
            msj: "error al actualizar el producto"
        });
    }   
}