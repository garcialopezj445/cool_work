/*
const mysql = require('mysql');
const { database } = require('./keys');
const { promisify } = require('util');
const pool = mysql.createPool(database);

pool.getConnection((err, connection) =>{
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
                 console.log('LA BASE DE DATOS FUE CERRADA');
        }

        if (err.code === 'ERR_CON_COUNT_ERRORS'){
             console.log('LA BASE DE DATOS TIENE MUCHAS CONEXIONES');
        }

        if (err.code === 'ECONNREFUSED'){
             console.log('LA CONEXIÓN A BASE DE DATOS FUE RECHAZADA')
        }
    }

    if(connection) connection.release();
    console.log('BASE DE DATOS CONECTADA');
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;
*/


 const oracledb = require('oracledb');

 db = {
     user: 'system',
     password: 'jhonsito00',
     connectString: 'localhost:1521',
 }

 async function open(sql, binds, autoCommit){
     let con = await oracledb.getConnection(db);
     let result = await con.execute(sql, binds, {autoCommit});
     con.release();
     return result;
 }

 exports.Open = open;
