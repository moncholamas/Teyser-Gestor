import  operador from '../models/operador';
import initModels from '../models/init-models';
import {sequelize} from '../db/db';
import {encriptar,compararEncryp} from '../helpers/encrypt'; 
import jsonwebtoken from 'jsonwebtoken';
import {SECRET} from '../config'

//
export async function login(req,res){
    res.json({
        msg: "hola login"
    })
}

export async function logup(req,res){
    //se crea un usuario y el admin lo valida para que empieze a funcionar la cuenta
    const {nombre,apellido,correo,clave} = req.body;
    //encriptamos la clave para guardarla en la db
    initModels(sequelize);

    //comprobar que no se repita el correo
    try {
        const operadorNuevo = await operador.create({
            tipo_operador: 'operario', 
            cuenta: 'inactivo',
            nombre,
            apellido,
            correo,
            clave: await encriptar(clave)
        },{});

        const token = jsonwebtoken.sign({id:operadorNuevo.id_operador},SECRET,{
            expiresIn: 86400
        });
        res.json({
            msg: `Nueva cuenta ingresada: ${operadorNuevo.nombre} ${operadorNuevo.apellido}`,
            data: token
        });

    } catch (error) {
        //console.error(error);
        res.json({
            msg: "error al crear el nuevo operador"
        });
    }
    
}
