import jwt from 'jsonwebtoken';
import {SECRET} from '../config'
import { sequelize } from '../db/db';
import initModels from '../models/init-models';
import operador from '../models/operador';

export async function verifyToken(req,res,next){
    const token = req.headers["x-token"];
    initModels(sequelize);
    //si es un token valido sigue
    try {
        req.decoded = jwt.verify(token,SECRET);
        req.operadorEncontrado = await operador.findByPk( req.decoded.id );
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            msg: "la verificación del token ha fallado"
        });
    }
}

export function isActive(req,res,next){
    //verifica si la cuenta está activada, caso contrario deniega el acceso
    if (req.operadorEncontrado.cuenta === 'activo'){
        next();
    }
    else{
        res.status(401).json({
            msg: "su cuenta necesita ser activada"
        });
    }

}

export async function isAdmin(req,res,next){
    
    //si es un admin puede seguir navegando, caso contrario deniega el acceso
    if (req.operadorEncontrado.tipo_operador === 'admin'){
        next();
    }
    else{
        res.status(401).json({
            msg: "el recurso esta reservado para administradores"
        });
    }
}
export function isOperator(req,res,next){

    //si es un operador puede seguir navegando, caso contrario deniega el acceso
    if (req.operadorEncontrado.tipo_operador === 'operario'){
        next();
    }
    else{
        res.status(401).json({
            msg: "el recurso esta reservado para operarios"
        });
    }

}


export function isAdminOrOperator(req,res,next){

    //si es un operador puede seguir navegando, caso contrario deniega el acceso
    if (req.operadorEncontrado.tipo_operador === 'operario' || 
        req.operadorEncontrado.tipo_operador === 'admin'){
        next();
    }
    else{
        res.status(401).json({
            msg: "el recurso esta reservado para operarios"
        });
    }

}