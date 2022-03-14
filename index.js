const inquirer = require('inquirer');
const db = require('./db/connection');
const { showDepartments, addDepartment, deleteDepartment } = require('./lib/departments');
const { showRoles, addRole, deleteRole } = require('./lib/roles');

showRoles();
