const bcrypt = require("bcrypt");

function bcryptPass(password) {
  return bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(password, salt))
    .catch((err) => {
      console.error("Error during password hashing:", err);
      throw err; // Re-throw the error to handle it upstream
    });
}

module.exports = bcryptPass;
