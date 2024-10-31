const express = require("express");
const db = require("../configs/db");
const router = express.Router();

router.post("/", (req, res) => {
  // console.log(req.body);
  const search = req.body.search;
  if (search === "") {
    return res.status(200).send("Search Something");
  }
  const query = "SELECT * FROM products WHERE name LIKE ?";
  db.query(query, [`%${search}%`], (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      const resultWithBase64 = result.map((data) => {
        if (data.image) {
          return { ...data, image: Buffer.from(data.image).toString("base64") };
        }
        return data; // Return the original data if no image
      });

      res.status(200).json(resultWithBase64);
    }
  });
});

module.exports = router;
