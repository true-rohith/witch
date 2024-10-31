const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../configs/db");
const jwt_secrete = process.env.JWT_SECRETE_KEY;


router.get("/", (req, res) => {
  // Check if the token exists in the cookies
  const jwt_token = req.cookies.token;

  if (!jwt_token) {
    return res.status(401).json({ error: "Unauthorized, no token provided" });
  }

  try {
    // Verify the token
    const data = jwt.verify(jwt_token, jwt_secrete);

    // Query the database using the decoded data (email)
    const query = "SELECT * FROM users WHERE email=?";

    db.query(query, [data.email], (error, result) => {
      if (error) {
        return res
          .status(500)
          .send({ error: "Database query failed", details: error });
      }
      return res.status(200).json(result);
    });
  } catch (err) {
    // Handle invalid or expired JWT tokens
    return res.status(401).json({ error: "invalid token" });
  }
});

router.put("/", (req, res) => {
  const { name, email } = req.body;
  const query = "UPDATE users SET name = ? WHERE email = ?";

  db.query(query, [name, email], (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send("Updated !!!");
    }
  });
});

router.post("/address", (req, res) => {
  const { email, address } = req.body;

  const query = "UPDATE users SET address = ? WHERE email = ?";

  db.query(query, [address, email], (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send("Address Added Successfully !!!");
    }
  });
});

module.exports = router;
