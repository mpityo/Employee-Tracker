const inquirer = require('inquirer');
const db = require('./db/connection');
const { showDepartments, addDepartment, deleteDepartment, utilizedBudget } = require('./lib/departments');
const { showRoles, addRole, deleteRole } = require('./lib/roles');
const { sortEmployeeBy, addEmployee, deleteEmployee, updateEmployee, filterEmployeeBy } = require('./lib/employees');
