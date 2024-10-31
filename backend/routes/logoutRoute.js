const express = require("express");
const router = express.Router();

router.get("/logout", (req, res) => {
  return res.clearCookie("token");
});

module.exports = router;
