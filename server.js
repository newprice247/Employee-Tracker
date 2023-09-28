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
            query = `SELECT departments.name AS Department
            FROM departments`
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
            departments.name AS Department
            FROM employees 
            JOIN roles
            ON employees.role_id = roles.id
            RIGHT JOIN departments
            ON roles.department_id = departments.id`
            break;
        case 'managers':
            query = `SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS Manager,
            roles.title AS Role
            FROM employees 
            JOIN roles
            ON employees.role_id = roles.id
            WHERE employees.manager_id is NULL`
            break;
        case 'employees by manager':
            query = `SELECT
            CONCAT(employees.first_name, ' ', employees.last_name) AS Employee,
            CONCAT(managers.first_name, ' ', managers.last_name)  AS Manager
            FROM employees
            INNER JOIN employees as managers
            ON employees.manager_id = managers.id`
            break;
        case 'employees by department':
            query = `SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS Employee, 
                departments.name AS Department 
                FROM employees
                JOIN roles
                ON employees.role_id = roles.id
                JOIN departments
                ON roles.department_id = departments.id`
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
const addEmployee = (first_name, last_name, employeeRole, manager_id) => {
    db.promise().query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES('${first_name}', '${last_name}', ${employeeRole}, ${manager_id})`)
        .then(() => console.clear())
        .then(() => {
            console.log(`${JSON.stringify(first_name)} ${JSON.stringify(last_name)} added as an employee`)
            startProgram()
        })

}

//Updates the role of the the targeted employee, based on the roles saved to the database
const updateEmployeeRole = (employee_id, newEmployeeRole, manager_id) => {
    db.promise().query(`UPDATE employees 
                        SET role_id = "${newEmployeeRole}", manager_id = "${manager_id}"
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

//Retrieves the list of managers from the employees table
const managerList = () => {
    return new Promise((resolve, reject) => {
        db.promise()
            .query(`SELECT CONCAT(first_name, ' ', last_name) AS name, id AS value 
        FROM employees 
        WHERE employees.manager_id is NULL`)
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
                case 'View employees by manager':
                    viewTable('employees by manager')
                    break;
                case 'View employees by department':
                    viewTable('employees by department')
                    break;
                case 'Add a department':
                    //Pulls data from the questions.addDepartment prompt and inserts the new department into the database
                    addDepartment(answers.addDepartment)
                    break;
                case 'Add a role':
                    //Pulls the department names and id's from the database and assigns it to the choices array for the inquirer prompt
                    promiseList("departments", "name")
                        .then((results) => {
                            iPrompts.addRolePrompt[2].choices = results;
                            return inquirer.prompt(iPrompts.addRolePrompt)
                        })
                        //Pulls the answers from the prompt and uses them to add a role to the database
                        .then((answers) => {
                            addRole(answers.roleTitle, answers.roleSalary, answers.roleDepartment)
                        })
                    break;
                case 'Add an employee':
                    //Pulls the roles and id's from the database and assigns it to the choices array for the inquirer prompt
                    promiseList("roles", "title")
                        .then((results) => {
                            iPrompts.addEmployeePrompt[2].choices = results;
                        })
                    managerList()
                        .then((results) => {
                            iPrompts.addEmployeePrompt[3].choices = results;
                            return inquirer.prompt(iPrompts.addEmployeePrompt)
                        })
                        .then((answers) => {
                            addEmployee(answers.first_name, answers.last_name, answers.employeeRole, answers.confirmManager)
                        })
                    break;
                case 'Update an employee role':
                    //Pulls the names of the employees and their id's and assigns it to the choices array to choose an employee
                    promiseList("employees", "CONCAT(first_name, ' ', last_name)")
                        .then((results) => {
                            iPrompts.updateEmployeePrompt[0].choices = results;
                        })
                    //Retrieves the employees with 'NULL' as a manager_id, and sends the list to the inquirer prompt
                    managerList()
                        .then((results) => {
                            iPrompts.updateEmployeePrompt[2].choices = results;
                        })
                    //Pulls the role titles and id's and assigns them to the choices array, so the user can update the chosen employee's role based on the existing roles in the database
                    promiseList("roles", "title")
                        .then((results) => {
                            iPrompts.updateEmployeePrompt[1].choices = results;
                            return inquirer.prompt(iPrompts.updateEmployeePrompt)
                        })
                        //Assigns the new role to the chosen employee
                        .then((answers) => {
                            updateEmployeeRole(answers.employeeChoice, answers.updateRole, answers.confirmManager)
                        })
                    break;
                case 'Delete a department':
                    //Pulls the department names and id's from the database and assigns it to the choices array for the inquirer prompt
                    promiseList("departments", "name")
                        .then((results) => {
                            iPrompts.deleteDepartmentPrompt[0].choices = results;
                            return inquirer.prompt(iPrompts.deleteDepartmentPrompt)
                        })
                        .then((answers) => {
                            db.promise().query(`DELETE FROM departments WHERE id = ${answers.deleteDepartment}`)
                                .then(() => console.clear())
                                .then(() => console.log(`Department successfully deleted`))
                                .then(() => startProgram())
                        })
                    break;
                case 'Delete a role':
                    //Pulls the role titles and id's from the database and assigns it to the choices array for the inquirer prompt
                    promiseList("roles", "title")
                        .then((results) => {
                            iPrompts.deleteRolePrompt[0].choices = results;
                            return inquirer.prompt(iPrompts.deleteRolePrompt)
                        })
                        .then((answers) => {
                            db.promise().query(`DELETE FROM roles WHERE id = ${answers.deleteRole}`)
                                .then(() => console.clear())
                                .then(() => console.log(`Role successfully deleted`))
                                .then(() => startProgram())
                        })
                    break;
                case 'Delete an employee':
                    //Pulls the employee names and id's from the database and assigns it to the choices array for the inquirer prompt
                    promiseList("employees", "CONCAT(first_name, ' ', last_name)")
                        .then((results) => {
                            iPrompts.deleteEmployeePrompt[0].choices = results;
                            return inquirer.prompt(iPrompts.deleteEmployeePrompt)
                        })
                        .then((answers) => {
                            db.promise().query(`DELETE FROM employees WHERE id = ${answers.deleteEmployee}`)
                                .then(() => console.clear())
                                .then(() => console.log(`Employee successfully deleted`))
                                .then(() => startProgram())
                        })
                    break;
                //Disconnects from mysql and terminates the node processes
                case 'Disconnect':
                    db.end()
                    break;
            }
        })
}
startProgram()