const server = require('express');

const router=server.Router();

let orders=[
    {
        id:1,
        estado:'nuevo',
        hora:'12:35',
        descripcion:'1xHamburguesa, 2xEnsalada Caesar',
        pago:{
            monto:500,
            tipo:'tarjeta'
        },
        usuario:'jun_cito',
        direccion:'calle falsa 123'
    }
];

router.get('/', (req,res)=>{
    res.status(200).json(orders);
});

function validateOrder(req,res,next){
    const {id, estado, hora, descripcion, pago, usuario, direccion}=req.body;
    if(!id||!estado||!hora||!descripcion||!pago||!usuario||!direccion){
        res.status(400).json('falta informacion');
    }else{
        next();
    }
}

router.post('/',validateOrder,(req,res)=>{
    orders.push(req.body);
    res.status(201).json('Orden creada');
})

function validateOrderId(req,res,next){
    orders.forEach((order)=>{
        if(order.id == req.params.id){
            next();
        }else{
            res.status(404).json('la orden no existe');
        }
    })
}

router.get('/:id',validateOrderId,(req,res)=>{
    const orderId = req.params.id
    res.status(200).json(orders[orderId-1]);
})


router.patch('/:id', (req,res)=>{
    //todavia no se me courre com hacerlo
    //va a ser mas facil una vez que una la BD con esto
})

module.exports=router;