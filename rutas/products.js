const server = require('express');

const router=server.Router();

let productos=[
    {
        id:1,
        nombre:'Hamburguesa',
        precio:'125$',
        url:''
    },
    {
        id:2,
        nombre:'Ensalada Caesar',
        precio:'120$',
        url:''
    }
]

let favoritos=[
    {
        id:1,
        nombre:'Hamburguesa',
        precio:'125$',
        url:''
    }
];

 function validarProducto(req, res, next){
    const { id, nombre, precio, url } = req.body;
    console.log(req.body);
    if(!id||!nombre||!precio||!url){
        res.status(400).json('Falta informacion')
    }else{
        productos.forEach(producto =>{
            if( producto.id ===id &&
                producto.nombre === nombre &&
                producto.precio === precio &&
                producto.url === url 
                ){
                    res.status(409).json('El producto ya existe');
                }
        })
        next();
    }
    
};

function validarId(req, res, next){
    productos.forEach((producto)=>{
    let bool = false;
    if(producto.id == req.params.id){
        bool = true;
    if(bool){
        next();
    }}else{
        res.status(404).json('Producto no existe')
    }    
    })
    
};

router.get('/',(req,res)=>{
    res.status(200).json(productos)
});

router.get('/productById/:id',validarId , (req,res)=>{
    const productId = req.params.id;
    res.status(200).json(productos[productId]);
});

router.get('/favoritos', (req,res)=>{
    res.status(200).json(favoritos)
});

router.post('/', validarProducto, (req,res)=>{
    productos.push(req.body);
    res.status(200).json('producto agregado');
});

router.post('/favoritos',validarProducto, (req,res)=>{
    const productId = req.params.id;
    favoritos.push(productos[productId]);
    res.status(200).json('Producto agregado a Favoritos');
})



module.exports=router;