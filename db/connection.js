const mysql = require('mysql2');
const { host, user, password } = require('../util/sql-connect');
const bluebird = require('bluebird');

const db =  mysql.createConnection(
    {
        host,
        user,
        password,
        database: 'store',
        Promise: bluebird
    },
    console.log('Connected to the store database')
);

module.exports = db;