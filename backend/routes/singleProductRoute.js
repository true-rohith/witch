const express = require("express");
const router = express.Router();
const db = require("../configs/db");

router.get("/:id", (req, res) => {
  const id = req.params.id;

  const query = "SELECT * FROM products WHERE id = ?";

  db.query(query, [id], (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      const resultWithBase64 = result.map((item) => {
        if (item.image) {
          return { ...item, image: item.image.toString("base64") };
        }
      });

      res.status(200).json(resultWithBase64);
    }
  });
});

module.exports = router;
