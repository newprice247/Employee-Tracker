const inquirer = require('inquirer');
// const mysql = require('mysql2/promise');
// // const creds = require('./config/.credentials')
const mysql = require('mysql2');
// create the connection
const db = mysql.createConnection(
            {
                host: 'localhost',
                // MySQL username,
                user: 'root',
                // MySQL password
                password: 'rootpassword1',
                database: 'employee_tracker'
            },
            console.log(`Connected to the Employee Tracker database.`)
        );
db.promise().query("SELECT * FROM EMPLOYEES")
  .then( ([rows,fields]) => {
    console.log(rows);
  })
  .catch(console.log)
  .then( () => db.end());


// const db = require('./config/connection.js')




// async function getDB() {
//     const mysql = require('mysql2/promise');
//     // const creds = require('./config/.credentials')
//     const db = await mysql.createConnection(
//         {
//             host: 'localhost',
//             // MySQL username,
//             user: 'root',
//             // MySQL password
//             password: 'rootpassword1',
//             database: 'employee_tracker'
//         },
//         console.log(`Connected to the bootcamp database.`)
//     );
//     const [rows, fields] = await db.execute('SELECT * FROM `employees` WHERE `id` < ? AND `last_name` = ?', [5, 'Smith']);
//     console.log()
// }

// getDB()