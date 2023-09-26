//Imports inquirer
const inquirer = require('inquirer');
//Imports mysql database credentials from local .credentials file that is gitignored and only accessible from local storage
const creds = require('./config/.credentials')
//Imports mysql and creates the connection to the database
const mysql = require('mysql2');
const db = mysql.createConnection(creds, console.log(`Connected to the Employee Tracker database.`));
// Imports inquirer prompts
const iPrompts = require('./config/questions')

//Uses switch statements to log the desired table to the console
const viewTable = (tableName) => {
    let query = ``
    switch (tableName) {
        case 'departments':
            query = `SELECT departments.name AS Department,
            CONCAT(managers.first_name, ' ', managers.last_name) AS Manager
            FROM departments
            JOIN managers
            ON departments.id = managers.department_id`
            break;
        case 'roles':
            query = `SELECT DISTINCT roles.title AS Role, roles.salary AS Salary, departments.name AS Department 
            FROM roles 
            JOIN departments 
            ON roles.department_id = departments.id`
            break;
        case 'employees':
            query = `SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS Employee,
            roles.title AS Role,
            CONCAT(managers.first_name, ' ', managers.last_name) AS Manager
            FROM employees 
            JOIN managers 
            ON employees.manager_id = managers.id
            JOIN roles
            ON employees.role_id = roles.id`
            break;
        case 'managers':
            query = `SELECT CONCAT(managers.first_name, ' ', managers.last_name) AS Manager, 
            departments.name AS Department 
            FROM managers 
            JOIN departments 
            ON managers.department_id = departments.id`
            break;
    }
    console.clear()
    db.promise().query(query)
                .then(([rows, fields]) => {
                    console.table(rows)
                })
                .catch(console.log)
                .then(() => startProgram())
}

//Adds the desired department to the database
const addDepartment = (newDepartment) => {
    db.promise().query(`INSERT INTO departments(name) VALUES('${newDepartment}')`)
        .then(() => console.clear())
        .then(() => console.log(`${JSON.stringify(newDepartment)} was successfully added as a department`))
        .then(() => startProgram());
}

//Adds the desired role to the database
const addRole = (roleTitle, roleSalary, roleDepartment) => {
    db.promise().query(`INSERT INTO roles(title, salary, department_id) VALUES('${roleTitle}', '${roleSalary}', ${roleDepartment} )`)
        .then(() => console.clear())
        .then(() => console.log(`The role ${JSON.stringify(roleTitle)} was successfully added`))
        .then(() => startProgram())
}

//Adds the desired employee to the database
const addEmployee = (first_name, last_name, employeeRole) => {
    db.promise().query(`INSERT INTO employees(first_name, last_name, role_id) VALUES('${first_name}', '${last_name}', ${employeeRole})`)
        .then(() => console.clear())
        .then(() => {
            console.log(`${JSON.stringify(first_name)} ${JSON.stringify(last_name)} added as an employee`)
            startProgram()
        })

}

//Adds the desired manager to the database
const addManager = (first_name, last_name, managerDept) => {
    db.promise().query(`INSERT INTO managers(first_name, last_name, department_id) VALUES('${first_name}', '${last_name}', ${managerDept})`)
        .then(() => console.clear())
        .then(() => {
            console.log(`${JSON.stringify(first_name)} ${JSON.stringify(last_name)} added as a department Manager`)
            startProgram()
        })

}

//Updates the role of the the targeted employee, based on the roles saved to the database
const updateEmployeeRole = (employee_id, newEmployeeRole) => {
    db.promise().query(`UPDATE employees 
                        SET role_id = "${newEmployeeRole}"
                        WHERE id = ${employee_id}`)
                .then(() => console.clear())
                .then(() => {
                    console.log(`Role successfully Changed`)
                    startProgram()
                })
}

//Function that pulls the data from the database and then makes it available to the inquirer prompts
const promiseList = (table, column) => {
    return new Promise((resolve, reject) => {
        db.promise()
        .query(`SELECT ${column} AS name, id AS value FROM ${table}`)
        .then(([rows, fields]) => {
            resolve(rows);
        })
        .catch((err) => reject(err))
    });
};

//Initializes the app, then displays the main menu in the console
const startProgram = () => {
    inquirer
    .prompt(iPrompts.questions)
    .then((answers) => {
        switch (answers.start) {
            
            case 'View all departments':
                viewTable('departments');
                break;
            case 'View all roles':
                viewTable('roles');
                break;
            case 'View all employees':
                viewTable('employees')
                break;
            case 'View all managers':
                viewTable('managers')
                break;
            case 'Add a department':
                addDepartment(answers.addDepartment)
                break;
            case 'Add a role':
                promiseList("departments", "name")
                    .then((results) => {
                        console.log(results)
                        iPrompts.addRolePrompt[2].choices = results;
                        return inquirer.prompt(iPrompts.addRolePrompt)
                    })
                    .then((answers) => {
                        addRole(answers.roleTitle, answers.roleSalary, answers.roleDepartment)
                    })
                break;
            case 'Add an employee':
                promiseList("roles", "title")
                    .then((results) => {
                        console.log(results)
                        iPrompts.addEmployeePrompt[2].choices = results;
                        return inquirer.prompt(iPrompts.addEmployeePrompt)
                    })
                    .then((answers) => {
                      addEmployee(answers.first_name, answers.last_name, answers.employeeRole)
                    })
                    break;
            case 'Add a manager':
                promiseList("departments", "name")
                    .then((results) => {
                        console.log(results)
                        iPrompts.addManagerPrompt[2].choices = results;
                        return inquirer.prompt(iPrompts.addManagerPrompt)
                    })
                    .then((answers) => {
                      addManager(answers.first_name, answers.last_name, answers.managerDept)
                    })
                    break;
            case 'Update an employee role':
                promiseList("employees", "CONCAT(first_name, ' ', last_name)" )
                .then((results) => {
                    console.log(results)
                    iPrompts.updateEmployeePrompt[0].choices = results;
                })
                promiseList("roles", "title")
                .then((results) => {
                    console.log(results)
                    iPrompts.updateEmployeePrompt[1].choices = results;
                    return inquirer.prompt(iPrompts.updateEmployeePrompt)
                })
                .then((answers) => {
                    updateEmployeeRole(answers.employeeChoice, answers.updateRole)
                })
                break;
            case 'Disconnect':
                db.end()
                break;
        }
    })
}
startProgram()