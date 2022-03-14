const inquirer = require('inquirer');
const db = require('./db/connection');
const { getDepartments, addDepartment, deleteDepartment } = require('./lib/departments');
