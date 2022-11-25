import MysqlDatabase from "../../config/db";

const GET_EMPLOYEES_QUERY = "select * from employees";

async function getAllEmployees() {
  const conn = await MysqlDatabase.getConnection();
  const [rows, fields] = await conn.query(GET_EMPLOYEES_QUERY);

  if (rows.toString().length == 0) return null;

  return rows;
}

const GET_EMPLOYEES_OF_SPECIFIC_USER_QUERY =
  "select * from employees where createdById = ?";

async function getAllEmployeesOfSpecificUser(userId: number) {
  const connection = await MysqlDatabase.getConnection();
  const [users, fields] = await connection.query(
    GET_EMPLOYEES_OF_SPECIFIC_USER_QUERY,
    [userId]
  );

  console.log(users);

  if (users.toString().length === 0) {
    return null;
  }

  return users;
}

const GET_EMPLOYEE_BY_ID_QUERY = "select * from employees where id = ?";

async function getEmployeeById(id: number) {
  const connection = await MysqlDatabase.getConnection();
  const [users, fields] = await connection.query(GET_EMPLOYEE_BY_ID_QUERY, [
    id,
  ]);

  if (users.toString().length === 0) {
    return null;
  }

  return users[0];
}

const GET_EMPLOYEE_BY_ID_OF_SPECIFIC_USER_QUERY =
  "select * from employees where id = ? and createdById = ?";

async function getEmployeeByIdOfSpecificUser(id: number, userId: number) {
  const connection = await MysqlDatabase.getConnection();
  const [users, fields] = await connection.query(
    GET_EMPLOYEE_BY_ID_OF_SPECIFIC_USER_QUERY,
    [id, userId]
  );

  if (users.toString().length === 0) {
    return null;
  }

  return users[0];
}

const SAVE_EMPLOYEE_QUERY =
  "insert into employees(name,age,salary,createdById) values(?,?,?,?);";

async function saveEmployee(employee: any) {
  const connection = await MysqlDatabase.getConnection();
  const { name, age, salary, createdById } = employee;
  const result = (await connection.query(SAVE_EMPLOYEE_QUERY, [
    name,
    age,
    salary,
    createdById,
  ])) as any;

  return result[0].insertId;
}

const UPDATE_EMPLOYEE_BY_ID_QUERY =
  "update employees set name = ?, age = ?, salary = ? where id = ? and createdById = ?";

async function updateEmployeeById(id: number, employee: any, userId: number) {
  const conn = await MysqlDatabase.getConnection();

  const result = (await conn.query(UPDATE_EMPLOYEE_BY_ID_QUERY, [
    employee.name,
    employee.age,
    employee.salary,
    id,
    userId,
  ])) as any;

  if (result[0].affectedRows === 0) return null;

  return "updated";
}

const DELETE_EMPLOYEE_BY_ID_QUERY =
  "delete from employees where id = ? and createdById = ?";

async function deleteEmployeeById(id: number, userId: number) {
  const conn = await MysqlDatabase.getConnection();

  const result = (await conn.query(DELETE_EMPLOYEE_BY_ID_QUERY, [
    id,
    userId,
  ])) as any;

  if (result[0].affectedRows === 0) {
    return null;
  }
  return "deleted";
}

export {
  getAllEmployees,
  saveEmployee,
  updateEmployeeById,
  deleteEmployeeById,
  getEmployeeById,
  getAllEmployeesOfSpecificUser,
  getEmployeeByIdOfSpecificUser,
};
