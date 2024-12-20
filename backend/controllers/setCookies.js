const jwt = require("jsonwebtoken");

const secret_key = process.env.JWT_SECRETE_KEY;

function createToken(email) {
  const token = jwt.sign({ email }, secret_key, { expiresIn: "7d" });
  return token;
}

module.exports = { createToken };
