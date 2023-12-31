//Object storing the various prompts for use in the app
const iPrompts = {
    //Main menu
    questions: [
        {
            type: 'list',
            name: 'start',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'View employees by manager',
                'View employees by department',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'Update an employee role',
                'Disconnect']
        },
        //When 'Add a department' is chosen, this prompt will trigger
        {
            type: 'input',
            name: 'addDepartment',
            message: 'What would you like your department to be called?',
            when: (answers) => answers.start === 'Add a department'
        }
    ],
    //Prompt for the 'Add a role' function of the app
    addRolePrompt: [
        {
            type: "input",
            name: "roleTitle",
            message: "What is the title of the role?"
        },
        {
            type: "number",
            name: "roleSalary",
            message: "What is the yearly salary for this role?"
        },
        //Pulls the data from the promiseList function and stores it in the empty 'choices' array
        {
            type: "list",
            name: "roleDepartment",
            message: "Which department does this role belong to?",
            choices: []
        }
    ],
    //Prompt for the 'Add an employee' function of the app
    addEmployeePrompt: [
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        },
        //Pulls the data from the promiseList function and stores it in the empty 'choices' array
        {
            type: "list",
            name: "employeeRole",
            message: "What is the employee's role or position?",
            choices: []
        },
        {
            type: "confirm",
            name: "confirmManager",
            message: "Does this employee have a manager?",
            default: true
        },
        //Pulls the data from the managerList function and stores it in the empty 'choices' array
        {
            type: "list",
            name: "managerChoice",
            message: "Who is this employee's manager",
            choices: [],
            when: (answers) => answers.confirmManager === true
        }

    ],
    //Prompts for the 'Update an employee role' function of the app
    updateEmployeePrompt: [
        {
            type: "list",
            name: "employeeChoice",
            message: "Which employee would you like to update?",
            choices: []
        },
        {
            type: 'list',
            name: 'updateRole',
            message: "What is the employee's new role?",
            choices: []
        },
        {
            type: "list",
            name: "confirmManager",
            message: "Who is this employee's new manager",
            choices: []
        }
    ],
    //Prompt for the 'Delete a department' function of the app
    deleteDepartmentPrompt: [
        {
            type: "list",
            name: "deleteDepartment",
            message: "Which department would you like to delete?",
            choices: []
        }
    ],
    //Prompt for the 'Delete a role' function of the app
    deleteRolePrompt: [
        {
            type: "list",
            name: "deleteRole",
            message: "Which role would you like to delete?",
            choices: []
        }
    ],
    //Prompt for the 'Delete an employee' function of the app
    deleteEmployeePrompt: [
        {
            type: "list",
            name: "deleteEmployee",
            message: "Which employee would you like to delete?",
            choices: []
        }
    ]
}

//Exports the above prompts as a single object
module.exports = iPrompts 