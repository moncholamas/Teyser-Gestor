require('dotenv').config();

function throwError (status,message,body){
    let error = new Error();
    error.status = status || 500;
    error.message = message || 'internal';
    error.body = body || {};
    throw error;
}

module.exports = throwError;