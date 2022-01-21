const bcryptjs = require('bcryptjs') ;

async function encrypt(pass){
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(pass,salt);
}

async function checkEncrypt(reqPass,dbPass){
    return await bcryptjs.compare(reqPass,dbPass);
}

module.exports= {
    encrypt,
    checkEncrypt
}