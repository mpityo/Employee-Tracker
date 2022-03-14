const cTabel = require('console.table');
const db = require('../db/connection');

function showRoles () {
    const sql = `SELECT role.id, role.title, role.salary, departments.name AS department 
                FROM role
                LEFT JOIN departments
                ON role.department_id = departments.id
                ORDER BY department`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.table(rows);
    });
}

function addRole (roleName, roleSalary, departmentId) {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    const params = [roleName, roleSalary, departmentId];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log(roleName + ' has been added successfully');
    })
}

function deleteRole (roleId) {
    const sql = `DELETE FROM role WHERE id = ?`;
    db.query(sql, roleId, (err, result) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log('Role has been deleted successfully');
    });
}

module.exports = { showRoles, addRole, deleteRole };