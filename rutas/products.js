const server = require('express');
const router=server.Router();
const Product = require('../models/product');
const db = require('../config/database');



//------GET------- 

//get de todos los productos
router.get('/',async (req,res)=>{
   await db.query('SELECT * FROM products',
    {type: db.QueryTypes.SELECT}
    ).then((results)=>{
        console.log(results);
        res.status(200).json(results);    
    })
    .catch((err)=>console.log(err));
})

//trae producto por id
router.get('/:id',async (req,res)=>{
    const productId = [req.params.id];
    const sql='SELECT * FROM products WHERE id = ?';
    await db.query(sql,{
        replacements:productId, type:db.QueryTypes.SELECT}
        ).then((product)=>{
            if(product.length>0){
                console.log(product);
                res.status(200).json(product);
            }else{
                res.status(404).json(`El producto con id: ${productId}, no existe`);
            }
        }).catch((err)=>console.log(err));

    });

//trae los productos favoritos de usuario
//ni idea como hacerlo todavia para que haga interaccion con 
//tabla usarios/pedidos?
router.get('/favoritos', (req,res)=>{
    res.status(200).json(favoritos)
});

//------POSTS--------

//crea producto nuevo y lo agrega a tabla products
router.post('/', async (req,res)=>{
    const product={
        id:'NULL',
        productName:req.body.productName,
        price:req.body.price,
        photoURL:req.body.photoURL,
        description:req.body.description
    }
    let sql=`INSERT INTO products VALUES (:id,:productName,:price,
        :photoURL,:description)`;
    await db.query(sql,{
        replacements:product
    }).then((newProduct)=>{
        console.log(newProduct);
        res.status(201).json(`El producto: ${product.productName}, fue creado con exito.`)
    }).catch((err)=>{
        console.log(err);
        console.log(product)
        res.status(400).json(`Ocurrio un error: ${err}`);
    })
});

//estamos en la misma que en favorites de get
router.post('/favoritos', (req,res)=>{
    const productId = req.params.id;
    favoritos.push(productos[productId]);
    res.status(200).json('Producto agregado a Favoritos');
})

//-------PATCH----------

//modificar nname/price/photoURL,description
//implementar que solo lo pueda hacer el admin

router.patch('/:id', async (req,res)=>{
    const productId=[req.params.id];
    const sql=`UPDATE products SET productName="${req.body.productName}",price="${req.body.price}",
    photoURL="${req.body.photoURL}",description="${req.body.description}" WHERE id=?`;
    await db.query(sql,{
        replacements:productId
    }).then((updatedProd)=>{
        console.log(updatedProd);
        res.status(201).json(`Producto con id: ${productId}, fue modificado con exito`)
    }).catch((err)=>{
        console.log(err);
        res.status(400).json(`El producto no pudo ser modificado. ERROR: ${err}`);
    })
})

//hacer uno igual pero para los productos favoritos
//aca o en users?

//-------DELETE----------


//Borra producto de la lista por id
router.delete('/:id', async(req,res)=>{
    const productId=[req.params.id];
    const sql=`DELETE FROM products WHERE id=?`;
    db.query(sql,{
        replacements:productId
    }).then((deletedProd)=>{
        console.log(deletedProd);
        res.status(200).json(`El producto con id: ${productId}, fue eliminado exitosamente`);
    }).catch((err)=>{
        console.log(err);
        res.status(400).json(`El producto con el id: ${productId}, no pudo ser eliminado. ERROR: ${err}`);
    })
})


//-------MIDDLEWARES------

//necesarios en esta parte?


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

module.exports=router;