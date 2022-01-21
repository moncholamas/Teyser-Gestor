const jwt = require('jsonwebtoken');
require('dotenv').config();

function createToken(payload){
    const token = jwt.sign(
        payload,
        process.env.SECRET_JWT
    );

    return token;
}

module.exports = createToken;