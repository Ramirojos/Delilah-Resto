const Sequelize = require('sequelize');
const db = require('../config/database');

const Order = db.define('order',{
    id:{
        primaryKey: true,
        type:Sequelize.INTEGER.UNSIGNED.ZEROFILL,
        autoIncrement: true 
    },
    userName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    orderDescription:{
        type:Sequelize.TEXT,
        allowNull:false

    },
    orderTime:{
        type:Sequelize.DATE,
        allowNull:false
    },
    contactAddress:{
        type:Sequelize.STRING,
        allowNull:false
    },
    paymentMethod:{
        type:Sequelize.STRING,
        allowNull:false
    },
    totalAmount:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    status:{
        type:Sequelize.STRING,
        allowNull:false
    }
},
    {timestamps: false}
    
)

module.exports=Order;