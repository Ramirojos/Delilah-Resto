const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user',{
    id:{
        primaryKey: true,
        type:Sequelize.INTEGER.UNSIGNED.ZEROFILL,
        autoIncrement: true 
    },
    userName:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.STRING
    },
    fullName:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING
    },
    contactPhone:{
        type:Sequelize.INTEGER
    },
    contactAddress:{
        type:Sequelize.STRING
    }},
    {timestamps: true}
    
)

module.exports=User;