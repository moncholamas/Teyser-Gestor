import  parte_diario from '../models/parte_diario';
import initModels from '../models/init-models';
import {sequelize} from '../db/db';

//trae todos los equipos
export async function getPartesDiarios(req,res){
    initModels(sequelize);
    try {
        const list_parte_diario = await parte_diario.findAll({
            attributes: [
                'id_parte_diario',
                'id_operador',
                'fecha',
                'hora_inicio',
                'hora_cierre',
                'turno',
                'recaudacion',
                'observacion']
        });
        return res.send({
            data: list_parte_diario
        });
    } catch (error) {
        console.error(error);
        return res.send({
            msj: "error al buscar los partes diarios"
        });
    }
    
}

//trae un equipo por ID
export async function getParteDiarioById(req,res){
    initModels(sequelize);
    const id= req.params.id;
    try {
        const parte_diario_encontrado = await parte_diario.findByPk(id);
        return parte_diario_encontrado == null?
            res.json({
                msj: "no se encontró un parte diario con la clave proporcionada"
            })
            :
            res.json({
                        data: parte_diario_encontrado
                        });
    } catch (error) {
        console.error(error);
        return res.send({
            msj: "error al buscar el parte diario"
        });
    }
}

//ingresa un nuevo equipo
export async function nuevoParteDiario(req,res ){
    initModels(sequelize);
    const {
        id_operador,
        fecha,
        hora_inicio,
        hora_cierre,
        turno,
        recaudacion,
        observacion} = req.body;
    try {
        const parte_diarioNuevo = await parte_diario.create(
            {
                id_operador,
                fecha,
                hora_inicio,
                hora_cierre,
                turno,
                recaudacion,
                observacion
            },{
    
            }
        );
        return res.json({
            msj: "nuevo parte diario ingresado correctamente",
            data: parte_diarioNuevo
        });
    } catch (error) {
        console.error(error);
        return res.send({
            msj: "error al ingresar el nuevo parte diario"
        });
    }
    
}

//borra un equipo por Id
export async function deleteParteDiario(req,res){
    initModels(sequelize);
    const id = req.params.id  
    try {
        const cantidadBorrada = await parte_diario.destroy({where:{id_parte_diario:id}});
        return cantidadBorrada >0?
        res.json({
            msj:"se borró exitosamente",
            data: cantidadBorrada
        })
        :
        res.json({
            msj:"no se encontraron coincidencias",
        });
    } catch (error) {
        console.error(error);
        return res.send({
            msj: "error al borrar el parte diario"
        });
    }
}


//actualiza un equipo
export async function updateParteDiario(req,res){
    initModels(sequelize);
    const id = req.params.id;
    const {
        id_operador,
        fecha,
        hora_inicio,
        hora_cierre,
        turno,
        recaudacion,
        observacion
    }  = req.body
    try {
        const parte_diarioActualizado = await parte_diario.update({
            id_operador,
            fecha,
            hora_inicio,
            hora_cierre,
            turno,
            recaudacion,
            observacion
        },{
            where: {id_parte_diario:id}
        });
        return parte_diarioActualizado > 0?
            res.json({
                msj: "parte diario actualizado correctamente",
                data: parte_diarioActualizado
            })
            :
            res.json({
                msj: "no se actualizó ningun parte diario"
            });
    } catch (error) {
        console.error(error);
        return res.send({
            msj: "error al borrar al actualizar el parte diario"
        });
    }   
}
