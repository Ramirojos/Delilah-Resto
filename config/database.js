const Sequelize = require ('sequelize');

module.exports = new Sequelize('delilah_resto', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});