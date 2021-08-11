import jwt from 'jsonwebtoken';
import {SECRET} from '../config'

export function verifyToken(req,res,next){
    const token = req.headers["x-token"];
    //si es un admin puede seguir navegando, caso contrario deniega el acceso
    req.decoded = jwt.verify(token,SECRET);
    console.log(decoded);
    next();
}

export function isAdmin(req,res,next){
    const token = req.headers["x-token"];
    //si es un admin puede seguir navegando, caso contrario deniega el acceso
    const decoded = jwt.verify(token,SECRET);
    console.log(decoded);
    next();
}
export function isOperator(){
    //SI es operador puede seguir navegando, caso contrario deniega el acceso
    const token = req.headers["x-token"];
    //si es un admin puede seguir navegando, caso contrario deniega el acceso
    const decoded = jwt.verify(token,SECRET);
    console.log(decoded);
    next();
}

export function isActive(){
    //verifica si la cuenta está activada, caso contrario deniega el acceso
}