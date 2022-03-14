const db = require('../db/connection');
const cTable = require('console.table');

function getDepartments () {
    const sql = `SELECT * FROM departments ORDER BY id`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.table(rows);
    });
}

function addDepartment (departmentName) {
    // TODO error checking to ensure name is not undefined or blank
    
    const sql = `INSERT INTO departments (name) VALUES (?)`;
    db.query(sql, departmentName, (err, result) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log(departmentName + ' department was added successfully');
    });
}

function deleteDepartment (departmentId) {
    // no error checking needed as user selects from a list of departments

    const sql = `DELETE FROM departments WHERE id = ?`;
    db.query(sql, departmentId, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('The departent was removed successfully');
    });
}

module.exports = { getDepartments, addDepartment, deleteDepartment };