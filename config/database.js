const {Sequelize} = require ('sequelize');

//todas las variables pueden ser cambiadas
//segun sea requerido

const dbName = 'delilah_resto';//nombre de la base de datos creada en MYSQL
const dbUser = 'root';// nombre del usuario
const password = '';//database password
const host = 'localhost';//direccion del host( si es local o la direccion url si es remoto)
const dialect = 'mysql'//dialecto de la base de datos

module.exports = new Sequelize(`${dbName}`,`${dbUser}`,`${password}`, {
  host: `${host}`,
  dialect: `${dialect}`
});
