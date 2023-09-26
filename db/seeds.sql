INSERT INTO departments (name)
VALUES ("Customer Service"),
       ("Meat Department"),
       ("Produce");
       
INSERT INTO roles (title, salary, department_id)
VALUES ("Cashier", 35000, 1),
       ("Meat Cutter", 45000, 2),
       ("Produce Clerk", 38000, 3),
       ("Customer Service Manager", 86000, 1),
       ("Produce Manager", 88000, 3),
       ("Meat Department Manager", 90000, 2);
       

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Elliot", "Smith", 5, NULL),
       ("Amira", "Afzal", 3, 1),
       ("Thomas", "Fairsfield", 4, NULL),
       ("Billy", "Fuuco", 1, 3),
       ("Roger", "Zaxby", 6, NULL),
       ("Christoper", "Lee", 2, 5);
       
       
