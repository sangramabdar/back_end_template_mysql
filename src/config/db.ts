import mysql, { Connection } from "mysql2/promise";

class MysqlDatabase {
  public static HOST = process.env.MY_SQL_DB_HOST;
  public static USER_NAME = process.env.MY_SQL_DB_USER;
  public static USER_PASSWORD = process.env.MY_SQL_DB_PASSWORD;
  public static PORT = Number.parseInt(process.env.MY_SQL_DB_PORT);
  public static DB_NAME = process.env.MY_SQL_DB_DATABASE;

  private static connection: Connection = null;

  static async connectToDatabase() {
    try {
      console.log("connecting");
      this.connection = await mysql.createConnection({
        host: "localhost",
        user: "sangram",
        port: 3306,
        password: "password",
        database: "assignment",
      });

      // this.connection = await mysql.createConnection({
      //   host: this.HOST,
      //   user: this.USER_NAME,
      //   port: this.PORT,
      //   password: this.USER_PASSWORD,
      //   database: this.DB_NAME,
      // });
      await this.connection.connect();

      console.log("database is connected");
    } catch (error) {
      console.log("database is not connected");
    }
  }

  static async getConnection() {
    if (!this.connection) {
      await this.connectToDatabase();
    }

    return this.connection;
  }
}

export default MysqlDatabase;
