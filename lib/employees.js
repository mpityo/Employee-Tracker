const db = require('../db/connection');
const cTable = require('console.table');

function showAllEmployees () {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name,
                role.title AS role,
                role.salary AS salary,
                departments.name AS department,
                employee.manager_id AS direct_manager 
                FROM employee LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN departments ON role.department_id = departments.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.table(rows);
    })
}
// returns a list of employees based on specific search terms
function showEmployeeBy (search) {

}

function addEmployee (firstName, lastName, role, manager) {

}

function deleteEmployee (empId) {

}

module.exports = { showAllEmployees, showEmployeeBy, addEmployee, deleteEmployee };