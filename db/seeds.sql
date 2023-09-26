INSERT INTO departments (name)
VALUES ("Customer Service"),
       ("Meat Department"),
       ("Produce");
       
INSERT INTO roles (title, salary, department_id)
VALUES ("Cashier", 35000, 1),
       ("Meat Cutter", 45000, 2),
       ("Produce Clerk", 38000, 3);
       

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Elliot", "Smith", 3, 3),
       ("Amira", "Afzal", 1, 2),
       ("Christoper", "Lee", 2, 1);
       
INSERT INTO managers (first_name, last_name, department_id)
VALUES ("Samantha", "Smith", 2),
       ("Brian", "Higby", 1),
       ("Cooper", "Leeland", 3);
       
