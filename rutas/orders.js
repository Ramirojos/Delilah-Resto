const server = require('express');
const router=server.Router();
const db = require('../config/database');
const Order = require('../models/order');



//------GET-----

//trae todos los pedidos
//solo podria hacerlo admin
router.get('/', async (req,res)=>{
    await db.query('SELECT * FROM orders',
        {type: db.QueryTypes.SELECT}
        ).then((resultados)=>{
            console.log(resultados)
            res.status(200).json(resultados);
        })
        .catch((err)=>{
            console.log(err);
            res.status(404).json(`Los datos no puden ser accedidos. ERROR: ${err}`);
});
})

//trae orden por id, solo podria el admin
router.get('/:id',async (req,res)=>{
    const orderId=[req.params.id];
    const sql= 'SELECT * FROM orders WHERE id=?';
    await db.query(sql,{
        replacements:orderId,
        type:db.QueryTypes.SELECT
    }).then((order)=>{
        if(order.length>0){
            console.log(order);
            res.status(200).json(order);
        }else{
            res.status(404).json(`La orden número: ${orderId}, no existe`);
        }
    }).catch((err)=>{
        console.log(err);
        res.status(400).json(`ERROR: ${err}`);
    })
})

//Hacer un get que traiga ordenes por estado?

//-------POST-------

//permite agregar pedidos a la tabla orders
//esto lo puede hacer el admin o el usuario(una vez loggeado)
//agregarun endpoint que sea addOrder?
router.post('/',async (req,res)=>{
    const order={
        id:'NULL',
        userName:req.body.userName,
        orderDescription:req.body.orderDescription,
        orderTime:req.body.orderTime,
        contactAddress:req.body.contactAddress,
        paymentMethod:req.body.paymentMethod,
        totalAmount:req.body.totalAmount,
        status:req.body.status
    };
    let sql=`INSERT INTO orders VALUES (:id,:userName,:orderDescription,:orderTime,:contactAddress,
        :paymentMethod,:totalAmount,:status)`;
    await db.query(sql,{
        replacements:order
    }).then((newOrder)=>{
        console.log(newOrder);
        res.status(201).json(`Tu orden fue creada con exito`)
    }).catch((err)=>{
        console.log(err);
        res.status(400).json(`ERROR: ${err}`);
    })
})

//-------PATCH---------

//hacerun update del estado del pedido
router.patch('/:id', async (req,res)=>{
    const orderId=[req.params.id];
    const sql= `UPDATE orders SET status="${req.body.status}" WHERE id=?`;
    await db.query(sql,{
        replacements:orderId
    }).then((updatedOrder)=>{
        console.log(updatedOrder);
        res.status(201).json(`El estado de la orden nro: ${orderId} fue modificado. Nuevo estado: ${req.body.status}`);
    }).catch((err)=>{
        console.log(err);
        res.status(400).json(`ERROR: ${err}`);
    })
})

//--------DELETE-------

//eliminar un pedido?
//necesario si hago el patch a estadocncelado?
router.delete('/:id', async(req,res)=>{
    const orderId=[req.params.id];
    const sql= `DELETE FROM orders WHERE id=?`;
    db.query(sql,{
        replacements:orderId
    }).then((deletedOrder)=>{
        console.log(deletedOrder);
        res.status(200).json(`El pedido con ID: ${orderId}, fue eliminado exitosamente.`)
    }).catch((err)=>{
        console.log(err);
        res.status(400).json(`ERROR: ${err}`)
    })
    })


//-------MIDDLEWARES--------

module.exports=router;