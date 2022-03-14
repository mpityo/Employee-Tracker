const mysql = require('mysql2');
const { host, user, password } = require('../util/sql-connect');

const db = mysql.createConnection(
    {
        host,
        user,
        password,
        database: 'store'
    },
    console.log('Connected to the store database')
);

module.exports = db;