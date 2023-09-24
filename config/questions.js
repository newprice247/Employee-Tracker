const questions = [
    {
        type: 'list',
        name: 'start',
        message: 'What would you like to do?',
        choices: ['View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Disconnect']
    },
    {
        type: 'input',
        name: 'addDepartment',
        message: 'What would you like your department to be called?',
        when: (answers) => answers.start === 'Add a department'
    }
]

const addRolePrompt = [
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
]

module.exports ={ questions, addRolePrompt }