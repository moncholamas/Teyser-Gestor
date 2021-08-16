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
        if(!idEncontrado){return res.json({msg: "No existe una cuenta con el correo ingresado"})}
        
        const usuarioEncontrado = await operador.findByPk(idEncontrado);
        const validacion = await compararEncryp(clave, usuarioEncontrado.clave);
        if(!validacion){return res.json({msg: "Contraseña incorrecta"}) }
        
        const token = jsonwebtoken.sign({
                // el token tiene el id, el rol y el estado de la cuenta
                                id: idEncontrado,
                                rol: usuarioEncontrado.tipo_operador,
                                cuenta: usuarioEncontrado.cuenta
                                },SECRET,{
                                    expiresIn: 86400
                                });
        res.json({
                msg: "Sesion iniciada",
                data: token
                });
    } catch (error) {
        console.log(error);
    }
    
}

export async function logup(req,res){
    try {
        const {nombre,apellido,correo,clave} = req.body;
        initModels(sequelize);
        const idEncontrado = await correoExistente(correo);
        
        //verifico si el correo ya existe
        if(idEncontrado){return res.json({msg: "error, el correo ya existe"});}

        const operadorNuevo = await operador.create({
            tipo_operador: 'operario', 
            cuenta: 'inactivo',
            nombre,
            apellido,
            correo,
            clave: await encriptar(clave) //encripta la clave antes de ingresar en la db
        },{});

        const token = jsonwebtoken.sign({id:operadorNuevo.id_operador,
                                        rol:operadorNuevo.tipo_operador,
                                        cuenta:operadorNuevo.cuenta
                                        },SECRET,{
                                            expiresIn: 86400
                                        });
        res.json({
            msg: `Nueva cuenta ingresada: ${operadorNuevo.nombre} ${operadorNuevo.apellido}`,
            data: token
        });
    } catch (error) {
        console.log(error);
    }

}
