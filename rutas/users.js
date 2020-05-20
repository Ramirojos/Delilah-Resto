const server = require('express');

const router=server.Router();

let users = [
    {
        id:1,
        displayName:"Cosme_Fulanito",
        password:"asd123",
        fullName:" Cosme Fulanito",
        email:"cosme@fulanito.com",
        contactPhone:12525545325,
        contactAdress:"calle falsa 123"
    }
]

router.get('/', (req,res)=>{
res.status(200).json(users);
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



module.exports=router;