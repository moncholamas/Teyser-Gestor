const express = require('express');
const router = require('./routes/index.js');
const port = 4000;
const app = express();

app.use('/',router);

app.listen(port,()=>{
    console.log("escuchando en el puerto:", port);
});