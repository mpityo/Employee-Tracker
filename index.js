const inquirer = require('inquirer');
const db = require('./db/connection');
const { showDepartments, addDepartment, updateDepartment, deleteDepartment, utilizedBudget } = require('./lib/departments');
const { showRoles, addRole, deleteRole } = require('./lib/roles');
const { sortEmployeeBy, addEmployee, deleteEmployee, updateEmployee } = require('./lib/employees');
const { getChoicesList } = require('./lib/allFunction');

/*
*What would you like to do?
 - Update information
    *What would you like to update?
     - Department name
     - Role information (name, salary, department it belongs to)
     - Employee information (name, role, manager)
        *Please enter the updated information (LEAVE BLANK TO KEEP CURRENT VALUE)
         - ???
         - ???
         - ???
        ** response for sucessfull or not **
        ** return to front of program **
 - Add information
    *What would you like to add?
     - Department
        * Please enter the information
         - Department name:
     - Role
         - Role name:
         - Department it belongs to:
         - Salary:
     - Employee
         - First name:
         - Last name:
         - Role: (select from list)
         - Manager: (select from list)
        ** Can I make this all one function?
 - Delete information
    *What would you like to delete?
     - Department
     - Role
     - Employee
     - Entire store
 - View information
    *
 - Quit
*/

function changeData () {
    let choices = [];
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainChoice',
            message: 'What would you like to update?',
            choices: [
                'Department name',
                'Role information (name, salary, department it belongs to)',
                'Employee information (name, role, manager id)'
            ]
        }
    ])
    .then((answer) => {
        if (answer.mainChoice.charAt(0) === 'D') {
            return `SELECT name FROM departments`;
        } else if (answer.mainChoice.charAt(0) === 'R') {
            return `SELECT title FROM role`;
        }
    });
}

function viewData () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'viewWhat',
            message: 'What would you like to view?',
            choices: [
                "All departments",
                "All roles",
                "All employees",
                "Employee by manager",
                "Employee by department"
            ],
        }
    ]).then((answer) => {
        if (answer.viewWhat.includes("departments")) {
            showDepartments();
        } else if (answer.viewWhat.includes("roles")) {
            showRoles();
        } else if (answer.viewWhat.includes("employees")) {
            sortEmployeeBy();
        } else if (answer.viewWhat.includes("manager")) {
            sortEmployeeBy('direct_manager');
        } else if (answer.viewWhat.includes("department")) {
            sortEmployeeBy('department');
        }
    }).then(() => {
        headOfProgram()
    });
}

function deleteData () {
    headOfProgram();
}

function addData (whatToAdd) {
    console.log(whatToAdd);
    if (whatToAdd === 'department') {
        inquirer.prompt([
            {
                type: 'input',
                name: 'nameOfDept',
                message: 'Enter the department name',
                validate: (nameOfDeptInput) => {
                    if (nameOfDeptInput) {
                        return true;
                    } else {
                        console.log('Please enter a valid name');
                        return false;
                    }
                }
            }
        ]).then((deptName) => {
            addDepartment(deptName.nameOfDept);
        }).then(() => {
            headOfProgram();
        });
    } else
    if (whatToAdd === 'role') {
        inquirer.prompt([
            {
                type: 'input',
                name: 'nameOfRole',
                message: 'Enter name of the role',
                validate: (nameOfRoleInput) => {
                    if (nameOfRoleInput) {
                        return true;
                    } else {
                        console.log('Please enter a valid role name');
                        return false;
                    }
                }
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Enter a salary for the role'
            },
            {
                type: 'number',
                name: 'departmentId',
                message: `Enter department ID it belongs to`,
            }
        ])
        .then((answers) => {
            addRole(answers.nameOfRole, answers.salary, answers.departmentId);
        })
        .then(() => {
            headOfProgram()
        });
    } else
    if (whatToAdd === 'employee') {
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter first name of employee',
                validate: (firstNameInput) => {
                    if (firstNameInput) {
                        return true;
                    } else {
                        console.log('Please enter a valid first name');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter last name of employee',
                validate: (lastNameInput) => {
                    if (lastNameInput) {
                        return true;
                    } else {
                        console.log('Please enter a valid last name');
                        return false;
                    }
                }
            },
            {
                type: 'number',
                name: 'roleId',
                message: 'Enter a role id for the role'
            },
            {
                type: 'number',
                name: 'managerId',
                message: `Enter manager ID it belongs to`,
            }
        ])
        .then((answers) => {
            addEmployee(answers.firstName, answers.lastName, answers.roleId, answers.managerId);
        })
        .then(() => {
            headOfProgram()
        });
    }
}

function headOfProgram () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'initialRoute',
            message: 'What would you like to do?',
            choices: [
                "Add department",
                "Add role",
                "Add employee",
                new inquirer.Separator(),
                "Update information",
                new inquirer.Separator(),
                "Delete department",
                "Delete role",
                "Delete employee",
                new inquirer.Separator(),
                "View information",
                new inquirer.Separator(),
                "Quit",
                new inquirer.Separator()
            ]
        },
    ]).then((answer) => {
        const ans = answer.initialRoute;
        if (ans.includes("Add")) addData(ans.substring(4));
        else if (ans === "Update information") changeData();
        else if (ans === "Delete information") deleteData(ans.substring(7));
        else if (ans === "View information") viewData();
        else console.log("Goodbye!");
    });
}

console.log('=============================');
console.log('Welcome to Employee Tracker!');
console.log('=============================');
headOfProgram();