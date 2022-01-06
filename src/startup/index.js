const express = require('express');
const http = require('http');

class Server{
    constructor({config,router}){
        this._config = config;
        this._express = express();
        this._server = http.createServer(this._express);
        this._express.use(router);
    }

    start(){
        return new Promise((resolve,reject)=>{
            this._server.listen(this._config.PORT,()=>{
                console.log([`${this._config.APPLICATION_NAME} is running in port ${this._config.PORT}`]);
            })
        })
    }
}

module.exports = Server;