const mysql = require('mysql2');
const config = require('../util/sql-connect');

const db = mysql.createConnection(
    {
        config,
        database: 'store'
    },
    console.log('Connected to the store database')
);

module.exports = db;