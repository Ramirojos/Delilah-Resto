
const bodyParser= require ('body-parser');
const express = require('express');
const server = express();



server.use(bodyParser.json());

const products = require('./rutas/products');
const orders = require('./rutas/orders');
const users = require('./rutas/users');

//Database

const db =require('./config/database');

//Routes

server.use('/products', products);
server.use('/orders', orders);
server.use('/users', users);



//test DB

db.authenticate()
    .then(()=>console.log('Database connected...'))
    .catch(err =>console.log('Error:'+err))

const PORT = process.env.PORT || 3000;

server.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})

server.use((err,req,res,next)=>{
    if(!err) return next();
    console.log('Error, algo salio mal',err);
    res.status(500).send('Error');
})


