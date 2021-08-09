import  operador from '../models/operador';
import initModels from '../models/init-models';
import {sequelize} from '../db/db';
import {encriptar,compararEncryp} from '../helpers/encrypt'; 
import jsonwebtoken from 'jsonwebtoken';
import {SECRET} from '../config'
import { correoExistente } from '../helpers/validator';

//
export async function login(req,res){
    const {correo,clave} = req.body;
    const idEncontrado = await correoExistente(correo);
    if(idEncontrado){
        //comparo la clave con la clave cifrada
        try {
            const usuarioEncontrado = await operador.findByPk(idEncontrado);
            const validacion = await compararEncryp(clave, usuarioEncontrado.clave);
            if(validacion){
                const token = jsonwebtoken.sign({id:idEncontrado},SECRET,{
                    expiresIn: 86400
                });
                res.json({
                    msg: "Sesion iniciada",
                    data: token
                })
            }
            else{
                res.json({
                    msg: "Contraseña incorrecta"
                })
            }
        } catch (error) {
            console.error(error);
        }
    }
    else{
        res.json({
            msg: "No existe una cuenta con el correo ingresado"
        })
    }
    
}

export async function logup(req,res){
    //se crea un usuario y el admin lo valida para que empieze a funcionar la cuenta
    const {nombre,apellido,correo,clave} = req.body;
    
    initModels(sequelize);
    //comprobar que no se repita el correo
    const idEncontrado = await correoExistente(correo);
    if (!idEncontrado) {
        try {
            const operadorNuevo = await operador.create({
                tipo_operador: 'operario', 
                cuenta: 'inactivo',
                nombre,
                apellido,
                correo,
                clave: await encriptar(clave) //encripta la clave antes de ingresar en la db
            },{});
    
            const token = jsonwebtoken.sign({id:operadorNuevo.id_operador},SECRET,{
                expiresIn: 86400
            });
            res.json({
                msg: `Nueva cuenta ingresada: ${operadorNuevo.nombre} ${operadorNuevo.apellido}`,
                data: token
            });
    
        } catch (error) {
            console.error(error);
            res.json({
                msg: "error al crear el nuevo operador"
            });
        }
    }
    else{
        res.json({
            msg: "error, el correo ya existe"
        });
    }
    
    
}
