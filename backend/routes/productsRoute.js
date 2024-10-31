const express = require("express");
const router = express.Router();
const db = require("../configs/db");

router.get("/:type", (req, res) => {
  const type = req.params.type;
  const query = "SELECT * FROM products WHERE category = ? ";
  db.query(query, [type], (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      const productWithBase64 = result.map((product) => {
        if (product.image) {
          return { ...product, image: product.image.toString("base64") };
        }
      });
      res.status(200).json(productWithBase64);
    }
  });
});

module.exports = router;
