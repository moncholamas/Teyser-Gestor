const passport = require('passport');
const throwError = require('../utils/throwError');

const  validateAuth = (req,res,next)=>{
    passport.authenticate('jwt', {session: false}, (err, user, info)=>{
        console.log("ejecutando *callback auth* de authenticate para estrategia jwt");
        //si hubo un error relacionado con la validez del token (error en su firma, caducado, etc)
        if(info){ return next(throwError(400,'invalid token','token')); }

        //si hubo un error en la consulta a la base de datos
        if (err) { return next(err); }

        //si el token está firmado correctamente pero no pertenece a un usuario existente
        if (!user) { return next(throwError(400,'unauthorized token','token')); }
        
        //inyectamos los datos de usuario en la request
        req.user = user;
        next();
    })(req, res, next);
}

module.exports = validateAuth;