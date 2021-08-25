import  producto from '../models/producto';
import  insumos from '../models/insumos';
import  consumos from '../models/consumos';
import initModels from '../models/init-models';
import {sequelize} from '../db/db';

//trae todos los equipos
export async function getProductos(req,res){
    initModels(sequelize);
    try {
        const list_productos = await producto.findAll({
            attributes: ['id_producto','nombre','descripcion','precio','categoria']
        });
        res.send({
            data: list_productos
        });
    } catch (error) {
        res.send({
            msj: "error al buscar los productos"
        });
        console.error(error);
    }
    
}

//trae un equipo por ID
export async function getProductoById(req,res){
    initModels(sequelize);
    const id= req.params.id;
    try {
        const productoEncontrado = await producto.findByPk(id);
        if (productoEncontrado == null){
            res.json({
                msj: "no se encontró un producto con la clave proporcionada"
            });
        }
        else{
            res.json({
                data: productoEncontrado
            });
        }
    } catch (error) {
        console.error(error);
        res.send({
            msj: "error al buscar el producto"
        });
    }
}

//ingresa un nuevo equipo
export async function nuevoProducto(req,res ){
    initModels(sequelize);
    const {nombre,descripcion,precio,categoria,detalle_insumos} = req.body;
    try {
        //todo se tiene que cargar completamente -> transaction
        const resul = sequelize.transaction(async (t)=>{
            //recibe un arreglo con los insumos y la cantidad que consume de c/u
            const productoNuevo = await producto.create(
                {nombre,
                descripcion,
                precio,
                categoria},
                {transaction:t}
            );
            
            for(const insumo of detalle_insumos){
                const nuevoInsumo = await insumos.findByPk(insumo.id_insumo);
                if(nuevoInsumo == null){
                    return res.json({
                        msj:"no se encontró ningun insumo con la clave ingresada"
                    });
                }else{
                    //actualizo la tabla consumos
                        const nuevoConsumo = await consumos.create({
                            id_producto: productoNuevo.id_producto,
                            id_insumo: insumo.id_insumo,
                            cantidad: insumo.cantidad
                        },{transaction:t});  
                }
            }
            t.afterCommit(()=>{
                res.json({
                    msj: "nuevo producto ingresado correctamente",
                    data: productoNuevo
                });
            });
        });
        
    } catch (error) {
        res.send({
            msj: "error al ingresar el nuevo producto"
        });
        console.error(error);
    }
    
}

//borra un equipo por Id
export async function deleteProducto(req,res){
    initModels(sequelize);
    const id = req.params.id  
    try {
        const cantidadBorrada = await producto.destroy({where:{id_producto:id}});
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
            msj: "error al borrar el producto"
        });
        console.error(error);
    }
}

//AUDITAR LOS CAMBIOS DE PRODUCTO
//actualiza un producto -> si un producto tiene que cambiar sus insumos se debe eliminar
export async function updateProducto(req,res){
    initModels(sequelize);
    const id = req.params.id;
    const {nombre,descripcion,precio,categoria}  = req.body
    try {
        const productosActualizado = await producto.update({
            nombre,
            descripcion,
            precio,
            categoria
        },{
            where: {id_producto:id}
        });
        if(productosActualizado > 0){
            res.json({
                msj: "no se actualizado correctamente",
                data: productosActualizado
            });
        }
        else{
            res.json({
                msj: "no se actualizó ningún producto"
            });
        }
    } catch (error) {
        console.error(error);
        res.send({
            msj: "error al actualizar el producto"
        });
    }   
}