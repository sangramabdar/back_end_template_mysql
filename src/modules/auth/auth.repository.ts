import MysqlDatabase from "../../config/db";

const SAVE_USER_QUERY = "insert into users(name,email,password) values(?,?,?);";

async function saveUser(user: any) {
  const connection = await MysqlDatabase.getConnection();
  const { name, email, password } = user;
  const result = (await connection.query(SAVE_USER_QUERY, [
    name,
    email,
    password,
  ])) as any;

  return result[0].insertId;
}

const GET_USER_BY_EMAIL_QUERY = "select * from users where email = ?;";

async function getUserByEmail(email: string) {
  const connection = await MysqlDatabase.getConnection();
  const [users, fields] = await connection.query(GET_USER_BY_EMAIL_QUERY, [
    email,
  ]);

  if (users.toString().length === 0) {
    return null;
  }

  return users[0];
}

const GET_USER_BY_ID_QUERY = "select * from users where id = ?;";

async function getUserById(id: number) {
  const connection = await MysqlDatabase.getConnection();
  const [users, fields] = await connection.query(GET_USER_BY_ID_QUERY, [id]);

  if (users.toString().length === 0) {
    return null;
  }

  return users[0];
}

// const UPDATE_USER_BY_EMAIL_QUERY =
//   "update users set name = ?,password = ? where email = ?;";

// async function updateUserByEmail(email: string, userDto: UserDto) {
//   const conn = await MysqlDatabase.getConnection();

//   const result = (await conn.query(UPDATE_USER_BY_EMAIL_QUERY, [
//     userDto.name,
//     userDto.password,
//     email,
//   ])) as any;

//   if (result[0].affectedRows === 0) return null;

//   return "updated";
// }

// const DELETE_USER_BY_EMAIL_QUERY = "delete from users where email = ?;";

// async function deleteUserByEmail(email: string) {
//   const conn = await MysqlDatabase.getConnection();

//   const result = (await conn.query(DELETE_USER_BY_EMAIL_QUERY, [email])) as any;

//   if (result[0].affectedRows === 0) {
//     return null;
//   }
//   return "deleted";
// }

// const GET_USERS_QUERY = "select id,name,email from users";

// async function getUsers() {
//   const conn = await MysqlDatabase.getConnection();

//   const [rows, fields] = await conn.query(GET_USERS_QUERY);
//   console.log(rows);
//   return rows;
// }

export { saveUser, getUserByEmail, getUserById };
