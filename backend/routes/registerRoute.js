const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../configs/db");
const secret_key = process.env.JWT_SECRETE_KEY;
const {
  sendOTP,
  registrationSuccessfullEmail,
} = require("../controllers/emailSender");

// Route to check if email exists
router.post("/emailCheck", (req, res) => {
  const { email } = req.body;

  // Execute the query using callback
  connection.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        // Handle any errors from the query
        console.error(err);
        return res.status(500).send("Server Error");
      }

      // Check if the email exists in the database
      if (result.length > 0) {
        // If email already exists, send a 409 status
        return res.status(409).send("Email Already Exists");
      } else {
        // If email does not exist, proceed to the next step
        return res.status(201).send("Proceed to the next process");
      }
    }
  );
});

// Route for sending otp to email
router.post("/emailOTP", async (req, res) => {
  const { email, otp } = req.body;
  await sendOTP(email, otp);
  res.status(201).send("OTP Sent Successfully!");
});

// Route for verifying email
router.post("/emailVerification", async (req, res) => {
  const { otp, inputOTP } = req.body;
  if (otp === inputOTP) {
    res.status(201).send("Email Successfully Verified");
  } else {
    res.status(409).send("OTP Incorrect");
  }
});

// Route for sending account created info on email
router.post("/accountCreatedEmail", async (req, res) => {
  const { email } = req.body;
  await registrationSuccessfullEmail(email);
  res.status(201).send("Account Created Email Sent Successfully !!!");
});

// Route to register a new user
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email already exists
    connection.query(
      "SELECT email FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Server Error");
        }

        if (result.length > 0) {
          return res.status(409).send("Email Already Exists");
        } else {
          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);

          // Insert the new user into the database
          connection.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword],
            (err) => {
              if (err) {
                console.error(err);
                return res.status(500).send("Error registering user");
              } else {
                return res.status(201).send("User Registered");
              }
            }
          );
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
