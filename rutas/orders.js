const server = require('express');
const router=server.Router();
const db = require('../config/database');


const {authenticateUser}=require('../middlewares/usersMiddlewares');

const {
    addOrder,
    listOrders,
    listOrdersById,
    deleteOrder,
    UpdateStatus    
} = require('../middlewares/ordersMiddlewares');

//------GET-----

//trae todos los pedidos
//solo podria hacerlo admin

//trae toda la tabla de ordenes, y trae userId, userName y adress de la tabla uSers
router.get('/',[authenticateUser,listOrders], (req,res)=>{
    res.status(200).json(req.ordersList);
})

//trae orden por id, solo podria el admin
router.get('/:orderId',[authenticateUser,listOrdersById],async (req,res)=>{
    res.status(200).json(req.ordersList)
})

//-------POST-------

//permite agregar pedidos a la tabla orders

router.post('/',[authenticateUser,addOrder],async (req,res)=>{
    res.status(200).json(`Su orden fue crada con exito.`);
})

//-------PATCH---------

//hacerun update del estado del pedido
router.patch('/:order_Id',[authenticateUser,UpdateStatus], async (req,res)=>{
    res.status(200).json(`Orden actualizada a: ${req.body.orderStatus}`)
})

//--------DELETE-------

//eliminar un pedido?
//necesario si hago el patch a estado cancelado?
router.delete('/:orderId',[authenticateUser,deleteOrder], async(req,res)=>{
    res.status(200).json('Orden eliminada')
})

module.exports=router;