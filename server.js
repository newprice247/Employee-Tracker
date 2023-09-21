const inquirer = require('inquirer');
const express = require('express')
const creds = require('./config/.credentials')
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3001;
const db = mysql.createConnection(creds, console.log(`Connected to the Employee Tracker database.`));

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.get('/api/departments', (req, res) => {
    db.promise().query("SELECT * FROM DEPARTMENTS")
        .then(([rows, fields]) => {
            res.json(rows);
        })
        .catch(console.log)
})

app.get('/api/roles', (req, res) => {
    db.promise().query("SELECT * FROM roles")
        .then(([rows, fields]) => {
            res.json(rows)
        })
        .catch(console.log)
})

app.get('/api/employees', (req, res) => {
    db.promise().query("SELECT * FROM employees")
        .then(([rows, fields]) => {
            res.json(rows)
        })
        .catch(console.log)
})

app.get('/', (req, res) => {
    res.send('Hey there!')
})

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




// db.promise().query("SELECT * FROM DEPARTMENTS")
//   .then( ([rows,fields]) => {
//     console.log(rows);
//   })
//   .catch(console.log)
//   .then(() => {
//     db.promise().query("SELECT * FROM roles")
//     .then( ([rows, fields] )=> {
//         console.log(rows)
//     })
//     .catch(console.log)
//   })
//   .then(() => {
//     db.promise().query("SELECT * FROM employees")
//     .then( ([rows, fields] )=> {
//         console.log(rows)
//     })
//     .catch(console.log)
//   })
//   .then( () => db.end());
