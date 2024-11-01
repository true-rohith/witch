const express = require("express");
const cors = require("cors");
const connection = require("./configs/db");
const products = require("./routes/productsRoute");
const user = require("./routes/userRoute");
const login = require("./routes/loginRoute");
const register = require("./routes/registerRoute");
const owner = require("./routes/adminPanel");
const cookieParser = require("cookie-parser");
const adminPanel = require("./routes/adminPanel");
const profile = require("./routes/profileRoute");
const search = require("./routes/searchRoute");
const allProducts = require("./routes/allProducts");
const product = require("./routes/singleProductRoute");
const cart = require("./routes/cartRoute");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json({ limit: "50mb" }));
app.use(cors({ origin: "https://witch-rho.vercel.app", credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/products", products);
app.use("/user", user);
app.use("/login", login);
app.use("/register", register);
app.use("/admin", adminPanel);
app.use("/profile", profile);
app.use("/search", search);
app.use("/allproducts", allProducts);
app.use("/product", product);
app.use("/cart", cart);

app.get("/", (req, res) => {
  connection.query("SELECT * FROM users", (err, result) => {
    if (err) {
      //   console.log("error in reading db");
      return res.status(500).send("Error reading database");
    }
    res.json(result);
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("Logged Out");
});

// app.get("/update", (req, res) => {
//   connection.query(
//     "UPDATE users SET Name = 'Rohit', Email = 'Rohit@gmail.com' WHERE Name = 'kljkldf'",
//     (err, result) => {
//       if (err) {
//         return res.status(500).send("Eroor in updating");
//       }
//       res.json(result);
//     }
//   );
// });

// app.get("/create", (req, res) => {
//   connection.query(
//     "INSERT INTO users (name, email, password) VALUES ('Rohit', 'Rohit1@gmail.com', 'rohit@123')",
//     (err) => {
//       if (err) {
//         return res.status(500).send(err);
//       }

//       connection.query("select * from users", (err, result) => {
//         if (err) return res.status(500).send(err);

//         res.json(result);
//       });
//     }
//   );
// });

app.listen(port, () => {
  console.log("Node Running");
});
