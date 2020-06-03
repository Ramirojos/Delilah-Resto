const server = require('express');
const jsw = require('jsonwebtoken');
const router = server.Router();
const db = require('../config/database');
const secret ='ulraSecret123';
const User = require('../models/user');
const faker =require('faker');



//-----GETs----
//Trae todos los usuarios, esto tiene que ser solo si sos admin.
//por ahiora trae todos
router.get('/', async(req,res)=>{
    await db.query('SELECT * FROM users',
        {type: db.QueryTypes.SELECT}
        ).then((resultados)=>{
            console.log(resultados)
            res.status(200).json(resultados);
        })
        .catch(err=>console.log(err));
})

//Trae un usuario por ID
router.get('/:id', async (req,res)=>{
     await db.query('SELECT * FROM users WHERE id = ?', 
    {replacements:[req.params.id], type: db.QueryTypes.SELECT})
        .then((user)=>{
            if(user.length>0){
                console.log(user);
                res.status(200).json(user);
            }else{
                res.status(404).json('El ususario con id :'+req.params.id+' no existe.');
            }
        })
        .catch(err=>console.log(err));
    })   
//-----POSTs-----

//crea usuario nuevo y agrea a la tabla de usuarios
router.post('/',async (req,res)=>{
    const user={
    id:'NULL',
    userName:req.body.userName,
    password:req.body.password,
    fullName:req.body.fullName,
    email:req.body.email,
    contactPhone:req.body.contactPhone,
    contactAddress:req.body.contactAddress
    }
    let sql =`INSERT INTO users VALUES (:id,:userName,:password,:fullName,:email,
        :contactPhone,:contactAddress)`;
    await db.query(sql,{
        replacements: user
    }).then((newUser)=>{
        console.log(newUser);
        res.status(201).json('Usuario creado con Exito')
    })
    .catch((err)=>console.log(err))
})

//post request para loguear al usuario con sus credenciales (si en orden)
//con express, todavia o implementado con Sequelize.
router.post('/:id/login', (req,res)=>{
    const{userName, password}=req.body;
    const validated = validateUser(userName,password);
    if(!validated){
        res.json({error:'Invalid Username or password'});
        return;
    }
    const token=jsw.sign({
        userName,
    },secret);
    let succes=`Bienvenido ${userName}`;
    res.json({succes,token})
})

//------PATCH-------


//permite moificar passwword/email/phone/adress
//implementar login
router.patch('/:id', async (req,res)=>{
    const userId=[req.params.id]
    const sql=`UPDATE users SET password="${req.body.password}",email="${req.body.email}",
    contactPhone="${req.body.contactPhone}",contactAddress="${req.body.contactAddress}" WHERE id=?`;
    await db.query(sql,{
        replacements:userId
    }).then((updatedUser)=>{
        console.log(updatedUser);
        res.status(201).json(`Usuario con id:${userId} actualizado con Exito`)
    }).catch((err)=>{
        console.log(err);
        res.status(400).json(`ERROR: ${err}`)
    })
    
})

//-----DELETE-------

router.delete('/:id', async(req,res)=>{
const sql= `DELETE FROM users WHERE id=?`;
db.query(sql,{
    replacements:[req.params.id]
}).then((deletedUser)=>{
    console.log(deletedUser);
    res.status(200).json(`El usuario con ID: ${req.params.id}, fue eliminado exitosamente.`)
}).catch((err)=>{
    console.log(err);
    res.status(400).json(`ERROR: ${err}`)
})
})

//-------MIDDLEWARES-------

//Chequea que el usuario y la contraseña sean correctas cuando quiere lohearse el usuario
//con express
function validateUser ( userName, password){
    const [filterUser]=users.filter(row=>row.userName==userName && row.password==password);
    if(!filterUser){
        return false;
    }
    return filterUser;
}

module.exports=router;

//Crea usarios con faker usar despues
/*const newUser={
    userName:faker.internet.userName(),
    password:faker.internet.password(),
    fullName:faker.name.findName(),
    email:faker.internet.email(),
    contactPhone:faker.phone.phoneNumber(),
    contactAddress:faker.address.streetAddress()
}*/