const db = require('../db/connection');
const cTable = require('console.table');

// returns a list of employees based on specific search terms
// leave argument blank to show all employees
function sortEmployeeBy (search) {
    let sql = `SELECT employee.id, employee.first_name, employee.last_name,
                role.title AS role,
                role.salary AS salary,
                departments.name AS department,
                employee.manager_id AS direct_manager 
                FROM employee LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN departments ON role.department_id = departments.id`;
    if (search) {
        // department, direct_manager, salary, role, first_name, last_name
        sql += ` ORDER BY ${search}`;
    }
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.table(rows);
    });
}

function addEmployee (firstName, lastName, role, manager) {
    role = isNaN(role) ?  null : role;
    manager = isNaN(manager) ? null : manager;

    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                VALUES (?,?,?,?)`;
    const params = [firstName, lastName, role, manager];
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log(`${firstName} ${lastName} was added successfully`);
    });
}

function deleteEmployee (empId) {
    const sql = `DELETE FROM employee WHERE id = ?`;
    db.query(sql, empId, (err, result) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log('Employee was deleted successfully');
    });
}

function updateEmployee (empId, propsToUpdate) {
    // name, role, department, salary, manager
    // get sql query
    let sql = `UPDATE employee SET `; 
    for (var i = 0; i < Object.values(propsToUpdate).length; i++) {
        sql += `${Object.keys(propsToUpdate)[i]} = ?`;
        // if this is NOT the last entry to change, add in , for next
        if (i+1 != Object.values(propsToUpdate).length) {
            sql += `, `
        // if is last entry, add in emp id
        } else {
            sql += ` WHERE id = ?`;
        }
    }

    // add values in order to array for db query, then push emp id at the end
    const params = [];
    Object.values(propsToUpdate).forEach(element => {
        params.push(element);
    });
    params.push(empId);

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log('Employee was updated successfully');
    });
}

module.exports = { sortEmployeeBy, addEmployee, deleteEmployee, updateEmployee };