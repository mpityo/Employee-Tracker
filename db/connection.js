const mysql = require('mysql2');
const { host, user, password, database } = require('../util/sql-connect');

const db =  mysql.createConnection(
    {
        host,
        user,
        password,
        database,
    },
    console.log(`Connected to the ${database} database`)
);

module.exports = db;