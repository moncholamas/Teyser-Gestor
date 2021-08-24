import  insumos from '../models/insumos';
import initModels from '../models/init-models';
import {sequelize} from '../db/db';

//trae todos los equipos
export async function getInsumos(req,res){
    initModels(sequelize);
    try {
        const list_insumos = await insumos.findAll({
            attributes: ['id_insumo','unidades','nombre','presentacion']
        });
        res.send({
            data: list_insumos
        });
    } catch (error) {
        res.send({
            msj: "error al buscar los insumos"
        });
        console.error(error)
    }
    
}

//trae un equipo por ID
export async function getInsumoById(req,res){
    initModels(sequelize);
    const id= req.params.id;
    try {
        const insumo = await insumos.findByPk(id);
        if (insumo == null){
            res.json({
                msj: "no se encontró un insumo con la clave proporcionada"
            });
        }
        else{
            res.json({
                data: insumo
            });
        }
    } catch (error) {
        res.send({
            msj: "error al buscar el insumo"
        });
        console.error(error);
    }
}

//ingresa un nuevo equipo
export async function nuevoInsumo(req,res ){
    initModels(sequelize);
    const {nombre,unidades,presentacion} = req.body;
    try {
        const insumoNuevo = await insumos.create(
            {nombre,
            unidades,
            presentacion
            },{
    
            }
        );
        res.json({
            msj: "nuevo insumo ingresado correctamente",
            data: insumoNuevo
        });
    } catch (error) {
        res.send({
            msj: "error al ingresar nuevo insumo"
        });
        console.error(error);
    }
    
}

//borra un equipo por Id
export async function deleteInsumo(req,res){
    initModels(sequelize);
    const id = req.params.id  
    try {
        const cantidadBorrada = await insumos.destroy({where:{id_sumo:id}});
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
            msj: "error al eliminar el insumo"
        });
        console.error(error);
    }
}


//actualiza un equipo
export async function updateInsumo(req,res){
    initModels(sequelize);
    const id = req.params.id;
    const {nombre,unidades, presentacion}  = req.body
    try {
        const insumosActualizado = await insumos.update({
            nombre,
            unidades,
            presentacion
        },{
            where: {id_insumo:id}
        });
        if(insumosActualizado > 0){
            res.json({
                msj: "insumo actualizado correctamente",
                data: insumosActualizado
            });
        }
        else{
            res.json({
                msj: "no se actualizó ningún insumo"
            });
        }
    } catch (error) {
        res.send({
            msj: "error al actualizar el insumo"
        });
        console.error(error);
    }   
}
