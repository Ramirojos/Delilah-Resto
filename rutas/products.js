const server = require('express');
const router=server.Router();
const Product = require('../models/product');
const db = require('../config/database');

//imports
const{
    authenticateUser
}=require('../middlewares/usersMiddlewares')

const{
    getProducts,
    getProductById,
    addNewProduct,
    checkProductFields,
    validateProductName,
    updateProduct,
    deleteProduct
}=require('../middlewares/productsMiddlewares');


//------GET------- 

//get de todos los productos
router.get('/',getProducts, async (req,res)=>{
})

//trae producto por id
router.get('/:id',[authenticateUser,getProductById],async (req,res)=>{
    });

//trae los productos favoritos de usuario
//ni idea como hacerlo todavia para que haga interaccion con 
//tabla usarios/pedidos?
router.get('/favoritos', (req,res)=>{
    res.status(200).json(favoritos)
});

//------POSTS--------

//crea producto nuevo y lo agrega a tabla products
router.post('/',[authenticateUser,checkProductFields,validateProductName,addNewProduct], async (req,res)=>{
});

//estamos en la misma que en favorites de get
router.post('/favoritos', (req,res)=>{
    const productId = req.params.id;
    favoritos.push(productos[productId]);
    res.status(200).json('Producto agregado a Favoritos');
})

//-------PATCH----------

//modificar nname/price/photoURL,description



router.patch('/:id',[authenticateUser,validateProductName,updateProduct], async (req,res)=>{
    
})

//hacer uno igual pero para los productos favoritos
//aca o en users?

//-------DELETE----------

//Borra producto de la lista por id
router.delete('/:id',[authenticateUser,deleteProduct], async(req,res)=>{
})



module.exports=router;