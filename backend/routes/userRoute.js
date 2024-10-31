const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(`<h1 style="background-color: red">It's User Page</h1>`);
});

module.exports = router;
