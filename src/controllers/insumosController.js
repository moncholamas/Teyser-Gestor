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
        return res.send({
            data: list_insumos
        });
    } catch (error) {
        console.error(error);
        return res.send({
            msj: "error al buscar los insumos"
        });
    }
}

//trae un equipo por ID
export async function getInsumoById(req,res){
    initModels(sequelize);
    const id= req.params.id;
    try {
        const insumo = await insumos.findByPk(id);
        return insumo === null?
            res.json({
                msj: "no se encontró un insumo con la clave proporcionada"
            })
            :
            res.json({
                data: insumo
            });
    } catch (error) {
        console.error(error);
        return res.send({
            msj: "error al buscar el insumo"
        });
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
        return res.json({
            msj: "nuevo insumo ingresado correctamente",
            data: insumoNuevo
        });
    } catch (error) {
        console.error(error);
        return res.send({
            msj: "error al ingresar nuevo insumo"
        });
    }
    
}

//borra un equipo por Id
export async function deleteInsumo(req,res){
    initModels(sequelize);
    const id = req.params.id  
    try {
        const cantidadBorrada = await insumos.destroy({where:{id_sumo:id}});
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
        console.error(error);
        return res.send({
            msj: "error al eliminar el insumo"
        });
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
        return insumosActualizado > 0 ?
            res.json({
                msj: "insumo actualizado correctamente",
                data: insumosActualizado
            })
            :
            res.json({
                msj: "no se actualizó ningún insumo"
            });
    } catch (error) {
        console.error(error);
        res.send({
            msj: "error al actualizar el insumo"
        });
    }   
}
