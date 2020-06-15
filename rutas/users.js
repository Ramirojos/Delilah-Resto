const server = require('express');
const router = server.Router();
const db = require('../config/database');

const {
    validateRegister,
    validateUserAndMail,
    validateLogin,
    authenticateUser,
    getUsers,
    singUpUser,
    updateUserInfo,
    deleteUser,
    getUserById,
}=require('../middlewares/usersMiddlewares')

//-----GETs----

//get de users
router.get('/',[authenticateUser,getUsers],async(req,res)=>{
})



//getr de  usuario por ID
router.get('/:id',[authenticateUser,getUserById], async (req,res)=>{
    })
       
//-----POSTs-----

//post User
router.post('/signup',[validateUserAndMail,singUpUser],async (req,res)=>{
})

//post login users
router.post('/login',validateLogin,async (req,res)=>{
    res.status(200).json(`usuario:${req.body.userName}, token:${req.token}`)
})

//------PATCH-------

//patch de informacion de usuario
router.patch('/:id',[authenticateUser,updateUserInfo], async (req,res)=>{
})

//-----DELETE-------

//delete de un usuario por id
router.delete('/:id',[authenticateUser,deleteUser],async(req,res)=>{
    
})


module.exports=router;

