const inquirer = require('inquirer');
const fs = require('fs')
const creds = require('./config/.credentials')
const mysql = require('mysql2');

const schema = fs.readFileSync("./db/schema.sql").toString().replace(/\n/g, "")
console.log(schema)
// create the connection
const db = mysql.createConnection(creds, console.log(`Connected to the Employee Tracker database.`));

db.promise().query("SELECT * FROM DEPARTMENTS")
  .then( ([rows,fields]) => {
    console.log(rows);
  })
  .catch(console.log)
  .then(() => {
    db.promise().query("SELECT * FROM roles")
    .then( ([rows, fields] )=> {
        console.log(rows)
    })
    .catch(console.log)
  })
  .then(() => {
    db.promise().query("SELECT * FROM employees")
    .then( ([rows, fields] )=> {
        console.log(rows)
    })
    .catch(console.log)
  })
  .then( () => db.end());
