const Sequelize = require('sequelize');
const db = require('../config/database');

const Order = db.define('order',{
    id:{
        primaryKey: true,
        type:Sequelize.INTEGER.UNSIGNED.ZEROFILL,
        autoIncrement: true 
    },
    userName:{
        type:Sequelize.STRING
    },
    orderDescription:{
        type:Sequelize.TEXT
    },
    orderTime:{
        type:Sequelize.DATE
    },
    contactAddress:{
        type:Sequelize.STRING
    },
    paymentMethod:{
        type:Sequelize.STRING
    },
    totalAmount:{
        type:Sequelize.INTEGER
    },
    status:{
        type:Sequelize.STRING
    }
},
    {timestamps: true}
    
)

module.exports=Order;