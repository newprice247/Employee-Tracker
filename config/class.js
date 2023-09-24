class Department  {
    constructor(name) {
        this.name = name
    }
}

class Role {
    constructor(title, salary, department_id) {
        this.title = title,
        this.salary = salary,
        this.department = department
    }
}

class Employee {
    constructor(first_name, last_name, role_id) {
        this.first_name = first_name,
        this.last_name = last_name,
        this.role_id = role_id
    }
}

module.exports = { Department, Role, Employee }