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
    },
    {
        type: 'list',
        name: 'addRole',
        message: 'What department would you like to add a role to?',
        choices: ,
        when: (answers) => answers.start === 'Add a role'
    }
]

module.exports = questions