const express = require('express');
const sequelize = require('../db/db');
const db = require('../db/db');
const mostrarProductos = require('../controllers/productos');
const router = express.Router();

router.use((req,res,next)=>{
    console.log('arranco express desde el router');
    next();
});

router.get('/productos',async (req,res,next)=>{
    res.send(mostrarProductos());
    next();
});


module.exports = router;