import  operador from '../models/operador';
import initModels from '../models/init-models';
import {sequelize} from '../db/db';
import {encriptar,compararEncryp} from '../helpers/encrypt'; 
import jsonwebtoken from 'jsonwebtoken';
import {SECRET} from '../config'
import { correoExistente } from '../helpers/validator';

//
export async function login(req,res){
    try {
        const {correo,clave} = req.body;
        const idEncontrado = await correoExistente(correo);

        //verifica si la cuenta de correo existe, caso negativo termina la consulta
        if(!idEncontrado){return res.json({msg: "No existe una cuenta con el correo ingresado"})}
        
        //trae el usuario de la DB
        const usuarioEncontrado = await operador.findByPk(idEncontrado);
        //compara las clave encriptada
        const validacion = await compararEncryp(clave, usuarioEncontrado.clave);
        //si no son iguales corta la consulta
        if(!validacion){return res.json({msg: "Contraseña incorrecta"}) }

        //envío el token con los datos del usuario
        const token = jsonwebtoken.sign({
                // el token tiene el id, el rol y el estado de la cuenta
                                id: idEncontrado,
                                rol: usuarioEncontrado.tipo_operador,
                                activo: usuarioEncontrado.activo
                                },SECRET,{
                                    expiresIn: 86400
                                });
        return res.json({
                msg: "Sesion iniciada",
                data: token
                });
    } catch (error) {
        console.log(error);
        return res.json({
            msg: "error al iniciar sesión"
        });
    }
    
}

export async function logup(req,res){
    try {
        const {nombre,apellido,correo,clave} = req.body;
        initModels(sequelize);
        const idEncontrado = await correoExistente(correo);
        
        //verifico si el correo ya existe, si existe termino la consulta
        if(idEncontrado){return res.json({msg: "el correo ya existe"});}

        const operadorNuevo = await operador.create({
            //por defecto todo operador es operario e inactivo
            tipo_operador: 'operario', 
            activo: false,
            nombre,
            apellido,
            correo,
            clave: await encriptar(clave) //encripta la clave antes de ingresar en la db
        },{});

        const token = jsonwebtoken.sign({id:operadorNuevo.id_operador,
                                        rol:operadorNuevo.tipo_operador,
                                        activo:operadorNuevo.activo
                                        },SECRET,{
                                            expiresIn: 86400
                                        });
        return res.json({
            msg: `Nueva cuenta ingresada: ${operadorNuevo.nombre} ${operadorNuevo.apellido}`,
            data: token
        });
    } catch (error) {
        console.log(error);
        return res.json({
            msg: "error al iniciar sesión"
        });
    }

}
