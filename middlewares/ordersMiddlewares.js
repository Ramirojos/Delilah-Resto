const Sequelize = require('sequelize');
const db = require('../config/database');
const time = require("moment");

//busca en la tabla de productos un producto por id
async function findProductById(id) {
    console.log('estoy en findProductById')
    try{
        console.log(id)
        const [dbProduct] = await db.query(`SELECT price FROM products WHERE product_Id = ${id}`, {raw: true, type: db.QueryTypes.SELECT});
        console.log(dbProduct.price)
        return dbProduct.price;   
    }catch(err){
        console.log(err)
        
    }
    
}

async function addOrder(req,res,next){
    console.log('estoy en addOrder')
    try{
        req.createdOrder=await addOrderinDB(req,res);
        next();
    }catch(err){
        next(new Error(err));
    }
};
//chequea que los campos en el body esten completos
//y que el user que esta haciendo el pedido tenga un id valido
async function addOrderinDB(req,res){
    console.log('estoy en addOrderInDB')
    const {products,payment_method}=req.body;
    console.log(req.body)
    if(products&&payment_method){
        if(req.userName.userId){
            const userId=req.userName.userId;
            const totalPrice=await obtainOrderPrice(products);
            console.log(totalPrice)
            const ordertime=time(Date.now()).format("YYYY-MM-DD HH:mm:ss");
            const addedOrder=await createOderRegistry(
                ordertime,
                totalPrice,
                payment_method,
                userId
            );
            await createOrderRelationship(addedOrder,products);
            return await printOrderinfo(addedOrder);
        }else{
            res.status(400).json("Usuario no encontrado");
        }
    }else{
        res.status(405).json("faltan parametros");
    }
}

//crea un nuevo registro en la tabla de ordenes
//devuelve el registro 
async function createOderRegistry(ordertime,totalPrice,paymentmethod,user){
    console.log('estoy en createOrderRegistry')
    const [addedRegistry]=await db.query(`INSERT INTO orders(created_at,order_amount,payment_method,userId)
    VALUES ('${ordertime}',${totalPrice},'${paymentmethod}',${user})`,{raw:true});
    return addedRegistry;

}

//consigue el total del precio de la orden sumando
//los subtotales de los productos
async function obtainOrderPrice(products){
    console.log('estoy en obtainOrderPrice')
    let subtotal=0;
    for(let i=0;i<products.length;i++){
        subtotal=+subtotal+ +(await findProductPrice(products[i]))
        console.log(subtotal)
    }
    return subtotal;
}

//espera la busqueda de la duncion findProductById y crea el subtotal
//que va a ser usado por obtainorderPrice
async function findProductPrice(product){
    console.log('estoy en findproductprice')
    console.log(product);
    const {product_Id,product_qty}=product;
    const productPrice=(await findProductById(product_Id));
    const subtotal=`${productPrice * product_qty}`;
    return subtotal
}

//agrega los registros relcionales en la tabla intermedia
async function createOrderRelationship(order_Id,products){
    console.log('estoy en createorderRelationship')
    products.forEach(async (product)=>{
        const {product_Id,product_qty}=product;
        await db.query(`INSERT INTO product_order (order_Id,product_Id,product_qty)
        VALUES (${order_Id},${product_Id},${product_qty})`,{raw:true});
    });
    return true;
}

//muestra  la lista de las ordenes si el user es admin
async function listOrders(req,res,next){
    if(req.userName.isAdmin){
      await db.query('SELECT orders.*,users.userName,users.contactAddress FROM orders JOIN users WHERE orders.userId = users.userId',
        {type: db.QueryTypes.SELECT}
        ).then((resultados)=>{
            console.log(resultados)
            res.status(200).json(resultados);
        })
        .catch((err)=>{
            console.log(err);
            res.status(404).json(`Los datos no puden ser accedidos. ERROR: ${err}`);
}); 
    }else{
        res.status(409).json("Usted no esta autorizado para realizar esta consulta")
    }
    
}

//deja pedir los detalles de una orden por id
//cuando el user es admin

async function listOrdersById(req,res,next){
    const orderId=[req.params.orderId];
    const sql= `SELECT *,users.userName,users.fullName,users.email,users.contactPhone,users.contactAddress,
                product_order.product_Id,product_order.product_qty    
                FROM orders 
                JOIN users ON users.userId=orders.userId
                JOIN product_order ON product_order.order_Id=orders.order_Id
                WHERE orders.userId=users.userId AND orders.order_Id=?`;
    if(req.userName.isAdmin){
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
    }else{
        res.status(409).json("Usted no esta autorizado para realizar esta consulta")
    }            
    
}

//hace el JOIN de las tablas de users y orders
//asi muestra los datos del user cuadno se muestra la orden
async function printOrderinfo(order_Id){
    console.log('estoy en printOrderinfo')
    const order = order_Id[0];
    const [productsInfo]= await db.query(`SELECT orders.*, users.userId, users.userName, users.fullName, users.email, users.contactPhone, users.contactAddress
    FROM orders JOIN users ON orders.userId = users.userId WHERE order_Id = ${order_Id}`,{raw:true});
    console.log(await productsInfo)
    return await productsInfo;
}

//permite borrar la orden
async function deleteOrder(req,res,next){
    try{
        if(req.userName.isAdmin){
            await db.query(`DELETE FROM orders WHERE order_Id=${req.params.orderId}`,{raw:true});
            return next();
        }else{
            res.status(409).json('No estas autorizado')
        }
    }catch(err){
        console.log(err);
        res.status(400).json(`La ordern no pudo se rborrada, ERROR:${err}`)
    }
}

//permite hacer el udate del status de la orden
async function UpdateStatus(req,res,next){
    const order_Id=[req.params.order_Id];
    try{
        if(req.userName.isAdmin){
            await db.query(`UPDATE orders SET orderStatus="${req.body.orderStatus}" WHERE order_Id=?`,
            {replacements:order_Id});
            next();
        }else{
            res.status(409).json('No estas autorizado')
        }
    }catch(err){
        return res.status(404).json(`El estado de la orden no pudo ser actualizado. Error: ${err}`);
    }
}

module.exports = {
    findProductById,
    addOrder,
    listOrders,
    listOrdersById,
    deleteOrder,
    UpdateStatus    
};
