const Sequelize = require('sequelize');
const db = require('../config/database');

const Product = db.define('product',{
    id:{
        primaryKey: true,
        type:Sequelize.INTEGER.UNSIGNED.ZEROFILL,
        autoIncrement: true 
    },
    productName:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
    },
    price:{
        type:Sequelize.SMALLINT,
        allowNull:false
    },
    photoURL:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    description:{
        type:Sequelize.TEXT,
        allowNull:false
    }
},
    {timestamps: false}
    
)

module.exports=Product;
