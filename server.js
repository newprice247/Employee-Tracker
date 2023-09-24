const inquirer = require('inquirer');
// const express = require('express')
const creds = require('./config/.credentials')
const mysql = require('mysql2');
// const createConnection = require('./config/connection')
const { questions, addRolePrompt } = require('./config/questions')
const { Department, Role, Employee } = require('./config/class')
const db = mysql.createConnection(creds, console.log(`Connected to the Employee Tracker database.`));

// const app = express();
// const db = mysql.createConnection(creds, console.log(`Connected to the Employee Tracker database.`));

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json())
const viewTable = (tableName) => {
    db.promise().query(`SELECT * FROM ${tableName}`)
                .then(([rows, fields]) => {
                    console.log(rows)
                })
                .catch(console.log)
                .then(() => startProgram())
}

const addRole = (roleTitle, roleSalary, roleDepartment) => {
    db.promise().query(`INSERT INTO roles(title, salary, department_id) VALUES('${roleTitle}', '${roleSalary}', ${roleDepartment} )`)
        .then(() => console.log(`${JSON.stringify(roleTitle)} was successfully added as a role to the ${roleDepartment} department`))
        .then(() => startProgram())
}

const addDepartment = (newDepartment) => {
    db.promise().query(`INSERT INTO departments(name) VALUES('${newDepartment}')`)
        .then(() => console.log(`${JSON.stringify(newDepartment)} was successfully added as a department`))
        .then(() => startProgram());
}

const promiseList = (table, column) => {
    return new Promise((resolve, reject) => {
        db.promise()
        .query(`SELECT ${column}, id AS value FROM ${table}`)
        .then(([rows, fields]) => {
            resolve(rows);
        })
        .catch((err) => reject(err));
    });
};



const startProgram = () => {
    inquirer
    .prompt(questions)
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
            case 'Add a department':
                addDepartment(answers.addDepartment)
                break;
            case 'Add a role':
                promiseList("roles", "name")
                .then((results) => {
                    addRolePrompt[2].choices = results;
                    return inquirer.prompt(addRolePrompt)
                })
                .then((answers) => {
                    addRole(answers.roleTitle, answers.roleSalary, answers.roleDepartment)
                })
                break;
            case 'Disconnect':
                db.end()
                break;
        }
    })
}

startProgram()


// app.get('/api/departments', (req, res) => {
//     db.promise().query("SELECT * FROM DEPARTMENTS")
//         .then(([rows, fields]) => {
//             res.json(rows);
//         })
//         .catch(console.log)
// })

// app.get('/api/roles', (req, res) => {
//     db.promise().query("SELECT * FROM roles")
//         .then(([rows, fields]) => {
//             res.json(rows)
//         })
//         .catch(console.log)
// })

// app.get('/api/employees', (req, res) => {
// db.promise().query("SELECT * FROM employees")
//     .then(([rows, fields]) => {
//         res.json(rows)
//     })
//     .catch(console.log)
// })

// app.get('/', (req, res) => {
//     res.send('Hey there!')
// })

// app.use((req, res) => {
//     res.status(404).end();
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


// returnList = (table, column) => {
//     db.promise().query(`SELECT ${column}, id AS value FROM ${table}`)
//         .then(([rows, fields]) => {
//         console.log('...');
//         const results = { rows, fields }
//         return results;
//         })
//         .then((results) => console.log(results))
//         .then(() => db.end())
    
// }

// returnList('roles', 'salary');