const express = require("express");
const mysql = require("mysql");
const app = express();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "test",
});

app.get("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("SELECT * FROM person LIMIT 1", (err, rows) => {
      connection.release(); // return the connection to pool
      if (err) throw err;
      console.log("The data from users table are: \n", rows);
      res.json({ rows });
    });
  });
});

app.get("/table", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "CREATE TABLE employee (id INT, name VARCHAR(255), email VARCHAR (255))",
      (err, res) => {
        connection.release();
        if (err) throw err;
        console.log("table is created");
        res.json("table is created");
      }
    );
  });
});

app.listen(3001, () => {
  console.log("app is listening to the port 3001");
});
