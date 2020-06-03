const Sequelize = require('sequelize');
const db = require('../config/database');

const Product = db.define('product',{
    id:{
        primaryKey: true,
        type:Sequelize.INTEGER.UNSIGNED.ZEROFILL,
        autoIncrement: true 
    },
    productName:{
        type:Sequelize.STRING
    },
    price:{
        type:Sequelize.SMALLINT
    },
    photoURL:{
        type:Sequelize.TEXT
    },
    description:{
        type:Sequelize.TEXT
    }
},
    {timestamps: true}
    
)

module.exports=Product;