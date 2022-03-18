const inquirer = require('inquirer');
const db = require('./db/connection');
const { showDepartments, addDepartment, updateDepartment, deleteDepartment, utilizedBudget } = require('./lib/departments');
const { showRoles, addRole, deleteRole } = require('./lib/roles');
const { sortEmployeeBy, addEmployee, deleteEmployee, updateEmployee } = require('./lib/employees');

function changeData (whatToChange) {
	if (whatToChange === 'department') {
	    inquirer.prompt([
	        {
	            type: 'input',
	            name: 'deptId',
	            message: 'What department would you like to update? (ID)'
	        },
			{
				type: 'input',
				name: 'deptName',
				message: 'What would you like to update the name to?',
                validate: (deptNameInput) => {
                    if (!deptNameInput) {
                        console.log('Must put in a name!');
                        return false;
                    } else {
                        return true;
                    }
                },
                when: ({ deptId }) => {
                    if (deptId != '') {
                        return true;
                    } else {
                        return false;
                    }
                }
			}
	    ])
	    .then((answer) => {
            console.log('\n');
            if (answer.deptId === '') {
                console.log('No changes were made');
            } else {
	            updateDepartment(answer.deptName, answer.deptId);
            }
	    })
		.then(() => {
			headOfProgram();
		});
	} else 
	if (whatToChange === 'employee') {
		inquirer.prompt([
	        {
	            type: 'input',
	            name: 'empId',
	            message: 'What employee would you like to update? (ID)',
				validate: (empIdInput) => {
					if (isNaN(empIdInput) || empIdInput === '') {
						console.log("Must enter a valid employee id");
						return false;
					} else {
						return true;
					}
				}
	        },
			{
				type: 'input',
				name: 'first_name',
				message: 'What would you like to update the first name to? (Leave blank to keep the same)'
			},
			{
				type: 'input',
				name: 'last_name',
				message: 'What would you like to update the last name to? (Leave blank to keep the same)'
			},
			{
	            type: 'number',
	            name: 'role_id',
	            message: 'What role would you like to update the employee with? (ID) (Leave blank to keep the same)'
			},
			{
	            type: 'number',
	            name: 'manager_id',
	            message: 'What manager would you like to update the employee with? (ID) (Leave blank to keep the same)'
			}
	    ])
	    .then((answers) => {
            // set empId and delete from answers obj for passing into employee func
            const empId = answers.empId;
            delete answers[Object.keys(answers)[0]];

            // loop thru each obj and if blank or invalid, delete
            let number = Object.values(answers).length;

            for (var i = 0; i < number; i++) {
                let keys = Object.keys(answers);
                let values = Object.values(answers);
                
                // if the current value is blank, or if there's a number that was left blank,
                // delete from object and update the respective numbers for the lowered obj list
                if (values[i] === '' || 
                    isNaN(values[i]) && keys[i] != 'first_name' && keys[i] != 'last_name') 
                {
                    delete answers[keys[i]];
                    i--;
                    number--;
				}
            }

            console.log('\n');
            // if all answers were deleted due to being blank, tell user and go back to main
            if (Object.values(answers).length != 0) {
			    updateEmployee(empId, answers);
            } else {
                console.log('No changes were made');
            }
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
        console.log('\n');
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
        } else {
            utilizationData();
        }
    }).then(() => {
        headOfProgram()
    });
}

function utilizationData () {
    inquirer.prompt([
        {
            type: 'number',
            name: 'deptId',
            message: 'What department would you like to view the payroll budget on? (ID)'
        }
    ])
    .then((ans) => {
        console.log('\n');
        utilizedBudget(ans.deptId);
    })
    .then(() => {
        headOfProgram();
    });
}

function deleteData (whatToDelete) {
    // delete a department
	if (whatToDelete === 'department') {
		inquirer.prompt([
			{
				type: 'number',
				name: 'deptId',
				message: "Input the department ID you'd like to delete (WARNING: deleting a department will also delete the associated roles):"
			}
		])
		.then((ansObj) => {
            console.log('\n');
            if (isNaN(ansObj.deptId)) {
                console.log("No changes were made, since input was left blank or was a non number.");
            } else {
                deleteDepartment(ansObj.deptId);
            }
		})
		.then(() => {
			headOfProgram();
		});
    // delete role or employee
	} else {
		inquirer.prompt([
			{
				type: 'input',
				name: 'id',
				message: `Input the ${whatToDelete} ID you'd like to delete:`,
                validate: (idInput) => {
                    if (isNaN(idInput) || idInput === '') {
                        console.log("Please put in a number!");
                        return false;
                    } else {
                        return true;
                    }
                }
			}
		])
		.then((ansObj) => {
            console.log('\n');
			if (whatToDelete === 'role') {
				deleteRole(ansObj.id);
			} else
			if (whatToDelete === 'employee') {
				deleteEmployee(ansObj.id);
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
            console.log('\n');
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
                type: 'input',
                name: 'salary',
                message: 'Enter a salary for the role',
                validate: (salaryInput) => {
                    if (isNaN(salaryInput) || salaryInput === '') {
                        console.log("Please enter a valid number!");
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            {
                type: 'input',
                name: 'departmentId',
                message: `Enter department ID it belongs to`,
                validate: (deptIdInput) => {
                    if (isNaN(deptIdInput) || deptIdInput === '') {
                        console.log("Please enter a valid number!");
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        ])
        .then((answers) => {
            console.log('\n');
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
            console.log('\n');
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
                "View budget information",
                new inquirer.Separator(),
                "Quit",
                new inquirer.Separator()
            ]
        },
    ]).then((answer) => {
        const ans = answer.initialRoute;
        if (ans.includes("Add")) addData(ans.substring(4));
        else if (ans.includes("Update")) changeData(ans.substring(7));
        else if (ans.includes("Delete")) deleteData(ans.substring(7));
        else if (ans === "View information") viewData();
        else if (ans === "View budget information") utilizationData();
        else console.log("Goodbye!");
    });
}

console.log('=============================');
console.log('Welcome to Employee Tracker!');
console.log('=============================');
headOfProgram();