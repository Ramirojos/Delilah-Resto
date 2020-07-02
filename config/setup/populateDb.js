const csv = require('csv-parser');
const fs = require('file-system');
const db = require('../../config/database');

const usersArr=[];
const productsArr=[];

fs.createReadStream('config/setup/users.csv')
.pipe(csv())
.on('data',(data)=>usersArr.push(data))
.on('end', ()=>{
    usersArr.forEach(
        async(user)=>{
            await db.query(`INSERT INTO users VALUES (:userId,:userName,:password,:fullName,:email,
                :contactPhone,:contactAddress,:isAdmin)`,
                {replacements: user})
        }
    )
})


fs.createReadStream('config/setup/products.csv')
.pipe(csv())
.on('data',(data)=>productsArr.push(data))
.on('end', ()=>{
    productsArr.forEach(
        async(product)=>{
            await db.query(`INSERT INTO products VALUES (:product_Id,:productName,:price,
                :photoURL)`,
                {replacements:product})
        }
    )
})
