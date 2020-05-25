const server = require('express');
const jsw = require('jsonwebtoken');
const router=server.Router();
const db=require('../config/database');
const secret ='ulraSecret123';
const User = require('../models/user');

let users = [
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
]

//https://sequelize.org/master/manual/raw-queries.html


//Trae todos los usuarios
router.get('/', (req,res)=>{
    db.query('SELECT * FROM users',
        {type: db.QueryTypes.SELECT}
        ).then((resultados)=>{
            console.log(resultados)
        })
        .catch(err=>console.log(err));

    /*User.findAll()
    .then(users=>{
        console.log(users);
        res.sendStatus(200);
    })
    .catch(err=>console.log(err))*/
})

// Validacion  de ID usuario 
function validateUserId(req, res, next){
    users.forEach((user)=>{
        if(user.id == req.params.id){
            next();
        }else{
            res.status(404).json('El ususario con id :'+req.params.id+' no existe.');
        }
    })
}

//Trae un usuario por ID
router.get('/:id',validateUserId, (req,res)=>{
    db.query('SELECT * FROM users WHERE id = ?', {
        replacements:[req.params.id], type: db.QueryTypes.SELECT})
        .then(user=>{
            console.log(user);
            res.status(200);

        //si pongo res.status(200).json(user),
        //error cannot set headers after they are sent to the client 
        //linea 66
        
        })
        .catch(err=>console.log(err));
    })
    //let userId = req.params.id
    


//Valida que todos los campos esten completos para la creacion de usuario

function validateNewUser(req,res,next){
    const {id,displayName,password,fullName,email,contactPhone,contactAdress}=req.body;
    if(!id||!displayName||!password||!fullName||!email||!contactPhone||!contactAdress){
        res.status(400).json('Bad request, missing information')
    }else{
        next();
    }
}


//Chequea si el DisplayName existe en la creacion de user nuevo
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


//crea usuario nuevo y agrea a la tabla de usuarios
router.post('/', [validateNewUser,checkForUser], (req,res)=>{
    //ahora es un push para el arreglo hardcodeado, despues con sequelize
    //users.push(req.body);


    res.status(201).json('Usuario creado con Exito');
})


//add a user


//Chequea qu eel usuari y la contraseña sean correctas cuando quiere lohearse el usuario
function validateUser ( displayName, password){
    const [filterUser]=users.filter(row=>row.displayName==displayName && row.password==password);
    if(!filterUser){
        return false;
    }
    return filterUser;
}

//post request para loguear a la usuario con sus credenciales (si en orden)
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