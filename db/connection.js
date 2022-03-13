const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        psssword: 'mintcake',
        database: 'store'
    },
    console.log('Connected to the store database')
);

module.exports = db;