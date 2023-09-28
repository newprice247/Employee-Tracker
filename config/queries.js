const mysql = require('mysql2');
const creds = require('./.credentials');
const db = mysql.createConnection(creds, console.log(`Connected to the Employee Tracker database.`));
const startProgram = require('../server');



const queries = {
    //Uses switch statements to log the desired table to the console
 viewTable(tableName) {
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
},

//Adds the desired department to the database
addDepartment(newDepartment) {
    db.promise().query(`INSERT INTO departments(name) VALUES('${newDepartment}')`)
        .then(() => console.clear())
        .then(() => console.log(`${JSON.stringify(newDepartment)} was successfully added as a department`))
        .then(() => startProgram());
},

//Adds the desired role to the database
addRole(roleTitle, roleSalary, roleDepartment) {
    db.promise().query(`INSERT INTO roles(title, salary, department_id) VALUES('${roleTitle}', '${roleSalary}', ${roleDepartment} )`)
        .then(() => console.clear())
        .then(() => console.log(`The role ${JSON.stringify(roleTitle)} was successfully added`))
        .then(() => startProgram())
},

//Adds the desired employee to the database
addEmployee(first_name, last_name, employeeRole, manager_id) {
    db.promise().query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES('${first_name}', '${last_name}', ${employeeRole}, ${manager_id})`)
        .then(() => console.clear())
        .then(() => {
            console.log(`${JSON.stringify(first_name)} ${JSON.stringify(last_name)} added as an employee`)
            startProgram()
        })

},

//Updates the role of the the targeted employee, based on the roles saved to the database
updateEmployeeRole(employee_id, newEmployeeRole, manager_id) {
    db.promise().query(`UPDATE employees 
                        SET role_id = "${newEmployeeRole}", manager_id = "${manager_id}"
                        WHERE id = ${employee_id}`)
        .then(() => console.clear())
        .then(() => {
            console.log(`Role successfully Changed`)
            startProgram()
        })
},

//Function that pulls the data from the database and then makes it available to the inquirer prompts
promiseList(table, column) {
    return new Promise((resolve, reject) => {
        db.promise()
            .query(`SELECT ${column} AS name, id AS value FROM ${table}`)
            .then(([rows, fields]) => {
                resolve(rows);
            })
            .catch((err) => reject(err))
    });
},

//Retrieves the list of managers from the employees table
managerList() {
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
}
}

module.exports = queries;