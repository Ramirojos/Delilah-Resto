const express = require('express');
const server = express();
const nodemon = require('nodemon');


server.listen(3000,()=>{
    console.log('server initialized');
})