
const iPrompts = {
    questions: [
        {
            type: 'list',
            name: 'start',
            message: 'What would you like to do?',
            choices: ['View all departments',
                'View all roles',
                'View all employees',
                'View all managers',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Add a manager',
                'Update an employee role',
                'Disconnect']
        },
        {
            type: 'input',
            name: 'addDepartment',
            message: 'What would you like your department to be called?',
            when: (answers) => answers.start === 'Add a department'
        }
    ],
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
        {
            type: "list",
            name: "roleDepartment",
            message: "Which department does this role belong to?"
        }
    ],
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
        {
            type: "list",
            name: "employeeRole",
            message: "What is the employee's role or position?"
        }
    ],
    addManagerPrompt: [
        {
            type: "input",
            name: "first_name",
            message: "What is the manager's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the manager's last name?"
        },
        {
            type: "list",
            name: "managerDept",
            message: "What department are they managing?",
            choices: []
        }
    ],
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
        }
    ]
}

module.exports = iPrompts 