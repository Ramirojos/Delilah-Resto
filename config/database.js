const Sequelize = require ('sequelize');


/*
const dbConfig={
  user:'DHBNrST4Ln',
  password:'JPRe5sm1By',
  host:'mysql@host',
  port:'process.env.PORT || 3000',
  database:'delilah_resto'
}
*/

module.exports = new Sequelize('delilah_resto', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
