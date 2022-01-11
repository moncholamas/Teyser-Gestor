const bcryptjs = require('bcryptjs') ;

async function encriptar(pass){
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(pass,salt);
}

async function compararEncryp(pass,passRes){
    return await bcryptjs.compare(pass,passRes);
}

module.exports= {
    encriptar,
    compararEncryp
}