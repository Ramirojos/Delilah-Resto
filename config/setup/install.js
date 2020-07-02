const sequelize = require('../database');
const { dbName } = require('../database');

async function createDB(){
    try{
        await sequelize.query(`CREATE SCHEMA IF NOT EXISTS ${dbName}`,{raw:true})
        .then(async()=>await console.log('Base de datos creada'))
    }catch(err){
        new Error(err);
    }
}


async function createOrderTable(){
    try{
        await sequelize.query(`CREATE TABLE IF NOT EXISTS orders
        (
            orderStatus varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'New',
            created_at datetime NOT NULL,
            order_Id int(4) NOT NULL AUTO_INCREMENT,
            order_amount int(4) NOT NULL,
            payment_method varchar(60) COLLATE utf8_unicode_ci NOT NULL,
            userId int(4) NOT NULL,
            PRIMARY KEY (order_Id),
            KEY userId (userId)
        )ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;`, { raw: true })
        .then(async()=> await console.log('Tabla de Ordenes Creada'))
    }catch(err){
        new Error(err)
    }    
};


async function createProductsTable(){
    try{
        await sequelize.query(`CREATE TABLE IF NOT EXISTS products 
        (
            product_Id int(4) NOT NULL AUTO_INCREMENT,
            productName varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
            price int(4) NOT NULL,
            photoURL varchar(256) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
            PRIMARY KEY (product_Id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;`,{raw:true})
        .then(async()=>await console.log('Tabla productos Creada'))
    }catch(err){
        new Error(err);
    }
};

async function createUsersTable(){
    try{
        await sequelize.query(`CREATE TABLE IF NOT EXISTS users(
            userId int NOT NULL AUTO_INCREMENT,
            userName varchar(255) COLLATE utf8_unicode_ci NOT NULL,
            password varchar(255) COLLATE utf8_unicode_ci NOT NULL,
            fullName varchar(255) COLLATE utf8_unicode_ci NOT NULL,
            email varchar(255) COLLATE utf8_unicode_ci NOT NULL,
            contactPhone int(10) NOT NULL,
            contactAddress varchar(255) COLLATE utf8_unicode_ci NOT NULL,
            isAdmin TINYINT(1) NOT NULL DEFAULT '0',
            PRIMARY KEY (userId)
        )ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;`, { raw: true })
        .then(async()=>await console.log('Tabla de usuarios creada'))
    }catch(err){
        new Error(err)
    }
}


async function createProductOrderTable() {
    try {
        await sequelize.query(`CREATE TABLE IF NOT EXISTS product_order (
            product_order_id int(4) NOT NULL AUTO_INCREMENT,
            order_Id int(4) NOT NULL,
            product_Id int(4) NOT NULL,
            product_qty int(4) NOT NULL,
            PRIMARY KEY (product_order_id),
            KEY product_Id (product_Id),
            KEY product_order_ibfk_1 (order_Id)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;`, { raw: true })
          .then(async () => await console.log('Tabla productos-ordenes creada'))  
    } catch(err){
        new Error(err);
    }
};


async function joinerOrder() {
    try {
        await sequelize.query(`ALTER TABLE orders
        ADD CONSTRAINT orders_ibfk_1 FOREIGN KEY (userId) REFERENCES users (userId) ON DELETE CASCADE ON UPDATE CASCADE;`
        ,{ raw: true })
        .then(async () => await console.log('Tabla joiner creada'))
    } catch(err) {
        new Error(err);
    }
}


async function joinerProductOrder() {
    try {
        await sequelize.query(`ALTER TABLE product_order
        ADD CONSTRAINT product_order_ibfk_1 FOREIGN KEY (order_Id) REFERENCES orders (order_id) ON DELETE CASCADE ON UPDATE CASCADE,
        ADD CONSTRAINT product_order_ibfk_2 FOREIGN KEY (product_Id) REFERENCES products (product_id);
      COMMIT;`, { raw: true })
      .then(async () => await console.log('Tabla joiner creada'));
    } catch(err){
        new Error(err);
    }
}

createDB();
createOrderTable();
createProductsTable();
createUsersTable();
createProductOrderTable();
joinerOrder();
joinerProductOrder();