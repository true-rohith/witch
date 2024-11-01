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

function handleDisconnect() {
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      setTimeout(handleDisconnect, 2000); // Attempt to reconnect after 2 seconds
    } else {
      console.log("Connected to the database successfully");
    }
  });

  connection.on("error", (err) => {
    console.error("Database error:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect(); // Reconnect if connection is lost
    } else {
      throw err; // Throw other errors
    }
  });
}

handleDisconnect();

// connection.connect((err) => {
//   if (err) {
//     console.log(err);
//     return;
//   } else console.log("connected to database successfully");
// });

// connection.end();

module.exports = connection;
