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

const addRows = (id, name, email) => {
  const insertQuery = "INSERT INTO ?? (??,??,??) VALUES (?,?,?)";
  const query = mysql.format(insertQuery, [
    "employee",
    "id",
    "name",
    "email",
    id,
    name,
    email,
  ]);
  pool.query(query, (err, res) => {
    if (err) throw err;
    console.log(res);
  });
};
// addRows(1, "Sajid Ali", "sajid@gmail.com");

const queryRow = (tableName, username, value) => {
  // -- method-1 --
  //   const insertQuery = "SELECT * FROM ?? WHERE ??=?";
  //   const query = mysql.format(insertQuery, [tableName, username, value]);
  const query = `SELECT * FROM ${tableName} WHERE ${username}="${value}"`;
  pool.query(query, (err, res) => {
    if (err) throw err;
    console.log(res);
  });
};
// queryRow("employee", "name", "Sajid Ali");

const updateRow = (
  tableName,
  updateFieldName,
  updateFieldNameValue,
  conditionField,
  conditionFieldValue
) => {
  const query = `UPDATE ${tableName} SET ${updateFieldName}="${updateFieldNameValue}" WHERE ${conditionField}="${conditionFieldValue}"`;

  pool.query(query, (err, res) => {
    if (err) throw err;
    console.log(res);
  });
};
// updateRow("employee", "id", 2, "name", "Sajid Ali");

const deleteRow = (tableName, conditionName, conditionNameValue) => {
  const query = `DELETE FROM ${tableName} WHERE ${conditionName}=${conditionNameValue}`;
  pool.query(query, (err, res) => {
    if (err) throw err;
    console.log(res);
  });
};

app.listen(3001, () => {
  console.log("app is listening to the port 3001");
});
