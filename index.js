const inquirer = require('inquirer');
const db = require('./db/connection');
const { showDepartments, addDepartment, updateDepartment, deleteDepartment, utilizedBudget } = require('./lib/departments');
const { showRoles, addRole, deleteRole } = require('./lib/roles');
const { sortEmployeeBy, addEmployee, deleteEmployee, updateEmployee } = require('./lib/employees');
const { getChoicesList } = require('./lib/allFunction');

function changeData (whatToChange) {
	if (whatToChange === 'department') {
	    inquirer.prompt([
	        {
	            type: 'number',
	            name: 'deptId',
	            message: 'What department would you like to update? (ID)'
	        },
			{
				type: 'input',
				name: 'deptName',
				message: 'What would you like to update the name to?'
			}
	    ])
	    .then((answer) => {
	        updateDepartment(answer.deptName, answer.deptId);
	    })
		.then(() => {
			headOfProgram();
		});
	} else 
	if (whatToChange === 'employee') {
		inquirer.prompt([
	        {
	            type: 'number',
	            name: 'empId',
	            message: 'What employee would you like to update? (ID)'
				validate: (empIdInput) => {
					if (empIdInput) {
						return true;
					} else {
						console.log("Must enter a valid employee id");
						return false;
					}
				}
	        },
			{
				type: 'input',
				name: 'employeeFirstName',
				message: 'What would you like to update the first name to? (Leave blank to keep the same)'
			},
			{
				type: 'input',
				name: 'employeeLastName',
				message: 'What would you like to update the last name to? (Leave blank to keep the same)'
			},
			{
	            type: 'number',
	            name: 'roleId',
	            message: 'What role would you like to update the employee with? (ID) (Leave blank to keep the same)'
			},
			{
	            type: 'number',
	            name: 'managerId',
	            message: 'What manager would you like to update the employee with? (ID) (Leave blank to keep the same)'
			}
	    ])
	    .then((answers) => {
			const answerArr = [];
			Object.values(answers).forEach(val => {
				if (val != '') {
					answerArr += [val];
				}
			})
			updateEmployee(answers.empId, answerArr);
	    })
		.then(() => {
			headOfProgram();
		});
	}
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

function deleteData (whatToDelete) {
	if (whatToDelete === 'department') {
		inquirer.prompt([
			{
				type: 'number',
				name: 'deptId',
				message: "Input the department ID you'd like to delete (WARNING: deleting a department will also delete the associated roles):"
			}
		])
		.then((id) => {
			deleteDepartment(id.deptId);
		})
		.then(() => {
			headOfProgram();
		});
	} else {
		inquirer.prompt([
			{
				type: 'number',
				name: 'id',
				message: `Input the ${whatToDelete} ID you'd like to delete:`
			}
		])
		.then((id) => {
			if (whatToDelete === 'role') {
				deleteRole(id.id);
			} else
			if (whatToDelete === 'employee') {
				deleteEmployee(id.id);
			}
		})
		.then(() => {
			headOfProgram();
		})
	}
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
                "Update department",
				"Update employee",
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
        else if (ans === "Update information") changeData(ans.substring(7));
        else if (ans === "Delete information") deleteData(ans.substring(7));
        else if (ans === "View information") viewData();
        else console.log("Goodbye!");
    });
}

console.log('=============================');
console.log('Welcome to Employee Tracker!');
console.log('=============================');
headOfProgram();