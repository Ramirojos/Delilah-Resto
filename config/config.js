
const dbHost = "http://localhost/";     //MODIFICAR HOST PARA LOCAL O REMOTO
const dbName = "delilah_resto";          //NOMBRE DE LA BASE DE DATOS CRREADA
const dbPort = "3306";
const dbUser = "root";
const password = null;

const dbPath = `mysql://${dbUser}:${password}@${dbHost}:${dbPort}/${dbName}`;

module.exports = { dbName, dbPath }