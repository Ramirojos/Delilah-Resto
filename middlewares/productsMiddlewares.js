const Sequelize = require('sequelize');
const db = require('../config/database');


//GET a la DB para traer la lista de productos, no necesita autorizacion
async function getProducts(req,res,next){
    await db.query('SELECT * FROM products',
    {type: db.QueryTypes.SELECT}
    ).then((results)=>{
        console.log(results);
        res.status(200).json(results);    
    })
    .catch((err)=>console.log(err));
};
//GET a la DB para traer un producto por id
async function getProductById(req,res,next){
    const product_Id = [req.params.product_Id];
    const sql='SELECT * FROM products WHERE product_Id = ?';
    await db.query(sql,{
        replacements:product_Id, type:db.QueryTypes.SELECT}
        ).then((product)=>{
            if(product.length>0){
                console.log(product);
                res.status(200).json(product);
            }else{
                res.status(404).json(`El producto con id: ${product_Id}, no existe`);
            }
        }).catch((err)=>console.log(err));
};
//POST a la DB para crear un nuevo producto
async function addNewProduct(req,res,next){
    const product={
        product_Id:'NULL',
        productName:req.body.productName,
        price:req.body.price,
        photoURL:req.body.photoURL,
    };
    let sql=`INSERT INTO products VALUES (:product_Id,:productName,:price,
                :photoURL)`;
    if(req.userName.isAdmin==1){
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
    }else{
        res.json('usted no esta autorizado para crear un producto');
    }
};
//checkea que no falten campos para completar
async function checkProductFields(req,res,next){
    const {productName,price,photoURL}=req.body;
    try{
       if(productName&&price&&photoURL){
        next()
    }else{
        console.log({productName,price,photoURL});
        console.log(req.body);
        res.status(400).json('faltan datos');
        
    } 
    }catch(err){
        res.json(err);
        console.log(err);
    }
    
};
//chequea que el producto no exista en la base de datos.
async function validateProductName(req,res,next){
    const {productName}=req.body;
    try{
        const createProductQuery =await db.query( `SELECT productName FROM products WHERE productName = '${req.body.productName}'`
        ,{type: db.QueryTypes.SELECT });
        if(!createProductQuery.length){
            next();
        }else{
            res.status(400).json(`EL producto: ${productName} ya existe`);
        }
    }catch(err){
        next(new Error(err));
    }    
};
//UPDATE a la DB para hacer update de un producto, necesita ser admin
async function updateProduct(req,res,next){
    const product_Id=[req.params.product_Id];
    const sql=`UPDATE products SET price="${req.body.price}",
    photoURL="${req.body.photoURL}" WHERE product_Id=?`;
    if(req.userName.isAdmin==1){
        try{
            await db.query(sql,{
            replacements:product_Id
        }).then((updatedProd)=>{
            console.log(updatedProd);
            res.status(201).json(`Producto con id: ${req.params.product_Id}, fue modificado con exito`)
        })}catch(err){
            console.log(err);
            res.status(400).json(`El producto no pudo ser modificado. ERROR: ${err}`);
        }   
        }else{
            res.json('Usted no esta autorizado para modificar el producto')
        }
};
//DELETE a la DB para borrar un producto, necesita ser admin
async function deleteProduct(req,res,next){
    const productId=[req.params.id];
    const sql=`DELETE FROM products WHERE product_Id=?`;
    if(req.userName.isAdmin==1){
        try{
            await db.query(sql,{
                replacements:productId
            }).then((deletedProd)=>{
                console.log(deletedProd);
                res.status(200).json(`El producto con id: ${productId}, fue eliminado exitosamente`);
        })}catch(err){
            console.log(err);
            res.status(400).json(`El producto con el id: ${productId}, no pudo ser eliminado. ERROR: ${err}`);
        }
    }else{
        res.json('No esta a utorizado a borrar productos')
    }
};



module.exports={
    getProducts,
    getProductById,
    addNewProduct,
    checkProductFields,
    validateProductName,
    updateProduct,
    deleteProduct
}