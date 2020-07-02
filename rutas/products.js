const server = require('express');
const router=server.Router();
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
router.get('/:product_Id',getProductById,async (req,res)=>{
    });

//------POSTS--------

//crea producto nuevo y lo agrega a tabla products
router.post('/',[authenticateUser,checkProductFields,validateProductName,addNewProduct], async (req,res)=>{
});

//-------PATCH----------

//modificar nname/price/photoURL,description

router.patch('/:product_Id',[authenticateUser,updateProduct], async (req,res)=>{
    
})

//-------DELETE----------

//Borra producto de la lista por id
router.delete('/:id',[authenticateUser,deleteProduct], async(req,res)=>{
})

module.exports=router;