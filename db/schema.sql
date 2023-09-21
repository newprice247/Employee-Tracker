USE employee_tracker;

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    enrolled BOOLEAN NOT NULL,
    PRIMARY KEY(id)
)