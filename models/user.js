const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user',{
    id:{
        primaryKey: true,
        type:Sequelize.INTEGER.UNSIGNED.ZEROFILL,
        autoIncrement: true 
    },
    userName:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    fullName:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
    },
    contactPhone:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    contactAddress:{
        type:Sequelize.STRING,
        allowNull:false
    },
    isAdmin:{
        type:Sequelize.TINYINT,
        allowNull:false
    }
    },
    {timestamps: false}
    
)


module.exports=User;
