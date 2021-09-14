import  operador from '../models/operador';
import initModels from '../models/init-models';
import {sequelize} from '../db/db';


export async function correoExistente(correo){
    //verifica si existe el correo
    //Devuelve el ID del operador o null si no existe
    initModels(sequelize);
    try {
        const usuarioEncontrado = await operador.findOne({
            where:{
                correo
            }
        });
        return usuarioEncontrado? usuarioEncontrado.id_operador : null;
        
    } catch (error) {
        return console.log(error);
    }
    
}
