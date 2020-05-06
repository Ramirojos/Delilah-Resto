
const bodyParser= require ('body-parser')
const express = require('express');
const server = express();
const nodemon = require('nodemon');

server.use(bodyParser.json())

//Array productos y favoritos
let arrProducts=[
    {
        id:1,
        nombre:'Chegusan',
        precio:'12',
        foto:'alto chegusan de milanga'
    },
    {
        id:2,
        nombre:'Ensalada Caesar',
        precio:'11',
        foto:'alta ensalada Caesar'
    }
]

let arrFavoritos=[]

//Middlewares
 function validarId(req, res, next){
    arrProducts.forEach((producto)=>{
    if(producto.id == req.params.id){
        next()
    }else{
        res.status(404).json('Producto no exite')
    }    
    })
    
}

function validarProducto(req, res, next){
    const { id, nombre, precio, foto } = req.body;
    if(!id||!nombre||!precio||!foto){
        res.status(400).json('Falta informacion')
    }else{
        next();
    }
    
}

//Requests

server.get('/productos',(req,res)=>{
    res.status(200).json(arrProducts)
})

server.get('/productos/:id', validarId , (req,res)=>{
    const productId = req.params.id;
    res.status(200).json(arrProducts[productId]);
})

server.get('/productos-favoritos', (req,res)=>{
    res.status(200).json(arrFavoritos);
})

server.post('/productos', validarProducto, (req,res)=>{
    arrProducts.push(req.body);
    res.status(200).json('producto agregado');
})

server.post('/productos-favoritos/:id',validarId , (req,res)=>{
    const productId = req.params.id;
    arrFavoritos.push(arrProducts[productId]);
    res.status(200).json('Producto agregado a Favoritos');
})



server.listen(3000,()=>{
    console.log('server initialized');
})




