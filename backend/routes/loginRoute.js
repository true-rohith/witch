const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const connection = require("../configs/db");
const { createToken } = require("../controllers/setCookies");

router.post("/", (req, res) => {
  const { email, password } = req.body;

  connection.query(
    "SELECT email, password FROM users WHERE email=?",
    [email],
    async (error, results) => {
      if (error) {
        console.error("Error during login:", error);
        return res.status(500).send("Server Error");
      }

      // Check if user exists
      if (results.length > 0) {
        const match = await bcrypt.compare(password, results[0].password);
        if (match) {
          const jwtToken = createToken(email);
          // console.log(jwtToken);
          res.cookie("token", jwtToken, {
            maxAge: 604800,
            sameSite: "none",
            secure: false,
          });
          return res.status(200).send(jwtToken);
        } else {
          return res.status(401).send("Incorrect Password");
        }
      } else {
        return res.status(404).send("User Does Not Exist");
      }
    }
  );
});

module.exports = router;
