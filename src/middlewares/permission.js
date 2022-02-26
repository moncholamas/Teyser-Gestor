const throwError = require("../utils/throwError");

const permission = roles => (req,res,next) => {
    const {rolId} = req.user.dataValues;
    const result = roles.some(rol=> parseInt(rol) === rolId);
    console.log(result);
    
    if (result) return  next();

    return throwError(123,'permission','perm');
}

module.exports = permission;