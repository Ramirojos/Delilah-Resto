
const bodyParser= require ('body-parser')
const express = require('express');
const server = express();


server.use(bodyParser.json());

const products = require('./rutas/products');
const orders = require('./rutas/orders');
const users = require('./rutas/users');

server.use('/products', products);
server.use('/orders', orders);
server.use('/users', users)

server.listen(3000,()=>{
    console.log('server initialized');
})

server.use((err,req,res,next)=>{
    if(!err) return next();
    console.log('Error, algo salio mal',err);
    res.status(500).send('Error');
})


