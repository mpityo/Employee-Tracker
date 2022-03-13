INSERT INTO department (name)
VALUES
    ('Front of House'),
    ('Back of House'),
    ('Sales'),
    ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Cashier', 25000, 1),
    ('Salesperson', 25000, 1),
    ('Customer Experience', 25000, 1),
    ('Supervisor', 33000, 1),
    ('Manager', 43000, 1),
    ('Truck Stock', 25000, 2),
    ('Restock Expert', 25000, 2),
    ('Supervisor', 33000, 2),
    ('Manager', 43000, 2),
    ('Product Procurement Associate', 40000, 3),
    ('Client Relations Associate', 40000, 3),
    ('Manager', 50000, 3),
    ('Recruiter', 40000, 4),
    ('Employee Relations Associate', 40000, 4),
    ('Payroll Associate', 40000, 4),
    ('Manager', 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id);