const server = require('express');
const jsw = require('jsonwebtoken');
const router=server.Router();
const db=require('../config/database');
const secret ='ulraSecret123';
const User = require('../models/user')
/*let users = [
    {
        id:1,
        displayName:"Cosme_Fulanito",
        password:"asd123",
        fullName:" Cosme Fulanito",
        email:"cosme@fulanito.com",
        contactPhone:12525545325,
        contactAdress:"calle falsa 123"
    },
    {
        id:2,
        displayName:"ConanElBarbaro",
        password:"miracomotemiraconan",
        fullName:" Conan",
        email:"conan@barbaro.com",
        contactPhone:12525545325,
        contactAdress:"calle falsa 123"
    }
]*/
router.get('/', (req,res)=>{

User.findAll()
    .then(users=>{
        console.log(users);
        res.sendStatus(200);
    })
    .catch(err=>console.log(err))
})

function validateUserId(req, res, next){
    users.forEach((user)=>{
        if(user.id == req.params.id){
            next();
        }else{
            res.status(404).json('El ususario con id :'+req.params.id+' no existe.');
        }
    })
}

router.get('/:id',validateUserId, (req,res)=>{
    let userId = req.params.id
    res.status(200).json(users[userId-1]);
})

function validateNewUser(req,res,next){
    const {id,displayName,password,fullName,email,contactPhone,contactAdress}=req.body;
    if(!id||!displayName||!password||!fullName||!email||!contactPhone||!contactAdress){
        res.status(400).json('Bad request, missing information')
    }else{
        next();
    }
}

function checkForUser(req, res, next){
    let existe = false;
    users.forEach((user)=>{
        if(req.body.id==user.id || req.body.displayName==user.displayName){
            existe=true;
        }})
    if(existe==true){
        res.status(409).json('Conflict, el usuario ya existe')
    }else{
        next();
    }    
}

router.post('/', [validateNewUser,checkForUser], (req,res)=>{
    //ahora es un push para el arreglo hardcodeado, despues con sequelize
    users.push(req.body);
    res.status(201).json('Usuario creado con Exito');
})

function validateUser ( displayName, password){
    const [filterUser]=users.filter(row=>row.displayName==displayName && row.password==password);
    if(!filterUser){
        return false;
    }
    return filterUser;
}

router.post('/:id/login', (req,res)=>{
    const{displayName, password}=req.body;
    const validated = validateUser(displayName,password);
    if(!validated){
        res.json({error:'Invalid Username or password'});
        return;
    }
    const token=jsw.sign({
        displayName,
    },secret);
    let succes=`Bienvenido ${displayName}`;
    res.json({succes,token})
})

module.exports=router;