# Employee Tracker
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  ## Description

  The goal of this project was to build a command-line application from scratch that uses Node.js, Inquirer, and MySQL to manage a company's employee database.

  ## Table of Contents 
  
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contribution](#contribution)
  - [Credits](#credits)
  - [License](#license)
  - [Tests](#tests)
  - [Questions](#questions)

  ## Installation
* Clone the repository to local storage
* Navigate to the folder inside your terminal and run 'npm install'
* Make sure you have MySQL installed on your machine, if you need help [here's a guide to get you started](https://coding-boot-camp.github.io/full-stack/mysql/mysql-installation-guide)
* Create a '.credentials' file inside the 'config' folder that contains the following code, replacing the 'user' and 'password' with your own MySQL credentials:

      //Stores the mysql credentials
      const creds = {
        host: 'localhost',
        // MySQL username,
        user: 'Your MySQL server username here',
        // MySQL password
        password: 'Your MySQL server password here',
        database: 'employee_tracker'
      };

      module.exports = creds

* In your MySQL shell or workbench, source the schema.sql and seeds.sql files that are located in the db folder to get the employee_tracker database and tables created and initialized. The commands should look something like this: 

        mysql> source C:\Users\mattn\Bootcamp\homework\Employee-Tracker\db\schema.sql

        mysql> source C:\Users\mattn\Bootcamp\homework\Employee-Tracker\db\seeds.sql
* Now that the database has some data, run 'npm start' in your terminal to start the application! 
 

  

  ## Usage
* Once the prerequisite files are installed, locate the 'Employee-Tracker' folder inside your terminal, and run 'npm start'

    [Click here to view the app in action](https://drive.google.com/file/d/1TrxnsZv5zZhxFxpnwEMd-gijA4BfQGOi/view)
  ![Alt text](<Untitled_ Sep 26, 2023 4_01 PM.gif>)

  ## Credits

  * UCF Fullstack Coding Bootcamp
  * Micheal Marsalo for collaborating and figuring out how to pull data from the database to use in other functions: in short, promises and promises in promises

  ## License

  [MIT](https://opensource.org/licenses/MIT)


  ## Questions
  
  Reach out to me if you have any questions about the project!
  
  Github: [https://github.com/newprice247](https://github.com/newprice247)
  
  Email: newprice247@gmail.com
