const inquirer = require('inquirer');
// const express = require('express')
const creds = require('./config/.credentials')
const mysql = require('mysql2');
const questions = require('./config/questions')
// const app = express();
const PORT = process.env.PORT || 3001;
// const db = mysql.createConnection(creds, console.log(`Connected to the Employee Tracker database.`));

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json())
const viewTable = (tableName) => {
    const db = mysql.createConnection(creds, console.log(`Connected to the Employee Tracker database.`));
    db.promise().query(`SELECT * FROM ${tableName}`)
                .then(([rows, fields]) => {
                    console.log(rows)
                })
                .catch(console.log)
                .then(() => db.end())
}

inquirer
    .prompt(questions)
    .then((data) => {
        if (data.start === 'View all departments') {
            viewTable('departments')
        } else if (data.start === 'View all roles') {
            viewTable('roles')
        } else if (data.start === 'View all employees') {
            viewTable('employees')
        }
    })

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
//         console.log(rows, fields);
//         const results = { rows, fields }
//         return results;
//         }
//     )
// }

// returnList('roles', 'salary');