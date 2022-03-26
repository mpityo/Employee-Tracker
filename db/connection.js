const mysql = require('mysql2');
//const { host, user, password, database } = require('../util/sql-connect');

const db =  mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'store'
    },
    console.log(`Connected to the store database`)
);

module.exports = db;