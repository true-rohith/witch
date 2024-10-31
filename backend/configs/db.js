const mysql = require("mysql2");
require("dotenv").config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

const connection = mysql.createConnection({
  host: host,
  user: user,
  // port: 3307,
  password: password,
  database: database,
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  } else console.log("connected to database successfully");
});

// connection.end();

module.exports = connection;
