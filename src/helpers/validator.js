import  operador from '../models/operador';
import initModels from '../models/init-models';
import {sequelize} from '../db/db';


export async function correoExistente(correo){
    //verifica si existe el correo
    initModels(sequelize);
    try {
        const usuarioEncontrado = await operador.findOne({
            where:{
                correo
            }
        });
        return usuarioEncontrado===null? null : usuarioEncontrado.id_operador ;
        
    } catch (error) {
        console.log(error);
        return null;
    }
    
}
