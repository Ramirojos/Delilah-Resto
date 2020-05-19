
const bodyParser= require ('body-parser')
const express = require('express');
const server = express();


server.use(bodyParser.json());

const productos = require('./rutas/products');
const pedidos = require('./rutas/orders');

server.use('/productos', productos);
server.use('/pedidos', pedidos);

server.listen(3000,()=>{
    console.log('server initialized');
})

server.use((err,req,res,next)=>{
    if(!err) return next();
    console.log('Error, algo salio mal',err);
    res.status(500).send('Error');
})


