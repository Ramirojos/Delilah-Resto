//DEPENDENCIES
const Sequelize = require('sequelize');
const db = require('../config/database');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');

//BCRYPT
const saltRounds=12

//Este pass puede ser cambiado por el que el dueño prefiera
const securePass ='securePassoparaeltoken';

//chequea que todos los campos esten completos
//sigue tirando "faltan datos" por mas que esten todos.
async function validateRegister(req,res,next){
    const {userName,password,fullName,email,contactPhone,contactAddress,isAdmin}=req.body;
    try{
        if((userName&&password&&fullName&&email&&contactPhone&&contactAddress)&&(isAdmin==1||isAdmin==0)){   
        next()
        }else{
        res.status(400).json('faltan datos');  
    } 
    }catch(err){
        res.json(err);
        console.log(err);
    }
    
};
//chequea que el usuario no exista en la base de datos.
async function validateUserAndMail(req,res,next){
    const {userName,email}=req.body;
    try{
        const registerQuery =await db.query( `SELECT userName, email FROM users WHERE userName = '${req.body.userName}' AND email='${req.body.email}'`
        ,{type: db.QueryTypes.SELECT });
        if(!registerQuery.length){
            next();
        }else{
            res.status(400).json(`EL usuario ${userName} ya existe`);
        }
    }catch(err){
        next(new Error(err));
    }    
};
//hace una validacion por userName y password, si validado entonces da token
async function validateLogin(req,res,next){

    const {userName,password}=req.body;
    
    const loginQuery=await db.query( `SELECT userId, userName, isAdmin FROM users WHERE userName='${userName}' AND password='${password}'`,
    {type: db.QueryTypes.SELECT});
    const foundUser = loginQuery[0];
    try{
        const { userName, isAdmin, userId} = foundUser; 
        req.token = jwt.sign({ userName, isAdmin, userId}, securePass, {expiresIn: "30m"});
        return next();
    }catch(err){
        res.status(401).json('Usuario o contraseña incorrectos');
        console.log(err);
    }
};
//va a ser usada en los endpoints que requieran que el usuario este logueado
function authenticateUser(req,res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken=jwt.verify(token, securePass);
        if (verifyToken){
            req.userName=verifyToken;
            next();
        }else{
            console.log('no pudo ser autenticado')
        }
    }catch(err){
        res.status(401).json(`ERROR: ${err}`)
    }
};
//get a la lista de usuarios si el user es admin
async function getUsers(req,res,next){
    if(req.userName.isAdmin==1){
        const allUsers=await db.query('SELECT * FROM users',
        {type: db.QueryTypes.SELECT})
        try{
            res.status(200).json(allUsers);
            return next();
        }catch(err){
            err=>console.log(err)}
    }else{
        res.json('no es admin')
    }
};
//hace el request de post ala db para insertar un usuario nuevo, por ahora permite meter si es admin o no
async function singUpUser(req,res,next){
    const user={
        userId:'NULL',
        userName:req.body.userName,
        password:req.body.password,
        fullName:req.body.fullName,
        email:req.body.email,
        contactPhone:req.body.contactPhone,
        contactAddress:req.body.contactAddress,
        isAdmin:req.body.isAdmin
    }
    let sql =`INSERT INTO users VALUES (:userId,:userName,:password,:fullName,:email,
        :contactPhone,:contactAddress,:isAdmin)`;
    
    await db.query(sql,{
        replacements: user
    }).then((newUser)=>{
        console.log(newUser);
        res.status(201).json('Usuario creado con Exito')
    })
    .catch((err)=>console.log(err))
};
//request de update/patch de informacion usuario, solo de passwords, contactPhone, contactAdress,email
async function updateUserInfo(req,res,next){
    const userId=[req.params.id]
    const sql=`UPDATE users SET password="${req.body.password}",email="${req.body.email}",
    contactPhone="${req.body.contactPhone}",contactAddress="${req.body.contactAddress}" WHERE userId=?`;

    await db.query(sql,{
        replacements:userId
    }).then((updatedUser)=>{
        console.log(updatedUser);
        res.status(201).json(`Usuario con id:${userId} actualizado con Exito`)
    }).catch((err)=>{
        console.log(err);
        res.status(400).json(`ERROR: ${err}`)
    })
};
//request de DELETE por el usuario para borrar su propio user
async function deleteUser(req,res,next){
    const sql= `DELETE FROM users WHERE userId=?`;
    db.query(sql,{
        replacements:[req.params.userId]
    }).then((deletedUser)=>{
        console.log(deletedUser);
        res.status(200).json(`El usuario con ID: ${req.params.userId}, fue eliminado exitosamente.`)
    }).catch((err)=>{
        console.log(err);
        res.status(400).json(`ERROR: ${err}`)
    })
};
//GET para conseguir un usuario por id, solo si sos admin
async function getUserById(req,res,next){
    if(req.userName.isAdmin==1||req.userName.userId==req.params.userId){
        await db.query('SELECT * FROM users WHERE userId = ?', 
        {replacements:[req.params.userId], type: db.QueryTypes.SELECT})
            .then((user)=>{
                if(user.length>0){
                    console.log(user);
                    res.status(200).json(user);
                }else{
                    res.status(404).json('El ususario con id :'+req.params.userId+' no existe.');
                }
            })
            .catch(err=>console.log(err));
        }else{
            res.json('Usted no esta autorizado para realizar esta accion')
        }
};


module.exports={
    validateRegister,
    validateUserAndMail,
    validateLogin,
    authenticateUser,
    getUsers,
    singUpUser,
    updateUserInfo,
    deleteUser,
    getUserById,
};