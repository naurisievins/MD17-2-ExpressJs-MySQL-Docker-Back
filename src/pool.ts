import mysql from "mysql2";

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "123456",
  database: "blog",
  port: 3306,
});

export default pool;
