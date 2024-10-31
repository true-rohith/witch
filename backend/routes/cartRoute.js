const express = require("express");
const router = express.Router();
const db = require("../configs/db");

router.get("/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  const query =
    "SELECT c.quantity, p.id, p.name, p.image, p.price FROM users AS u INNER JOIN cart AS c ON u.id = c.user_id INNER JOIN products AS p ON c.product_id = p.id WHERE u.id = ?";

  db.query(query, [user_id], (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      const resultWithBase64 = result.map((item) => {
        return { ...item, image: item.image.toString("base64") };
      });
      res.status(200).json(resultWithBase64);
    }
  });
});

router.get("/:user_id/:product_id", (req, res) => {
  const user_id = req.params.user_id;
  const product_id = req.params.product_id;

  const checkProductInCartQuery =
    "SELECT * FROM cart WHERE user_id=? AND product_id=?";

  db.query(checkProductInCartQuery, [user_id, product_id], (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      if (result.length > 0) res.status(201).send("Product Already In Cart");
      else res.status(200).send("Product does not exist in cart");
    }
  });
});

router.post("/", (req, res) => {
  const { user_id, product_id } = req.body;
  const query = "INSERT INTO cart (user_id, product_id) VALUES (?,?)";
  const checkProductInCartQuery =
    "SELECT * FROM cart WHERE user_id=? AND product_id=?";

  db.query(checkProductInCartQuery, [user_id, product_id], (error, result) => {
    if (result.length > 0) {
      res.status(201).send("Product Already In Cart");
    } else {
      db.query(query, [user_id, product_id], (error, result) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.status(200).send("Addes TO Cart");
        }
      });
    }
  });
});

router.delete("/:product_id", (req, res) => {
  const product_id = req.params.product_id;

  const query = "DELETE FROM cart WHERE product_id = ?";

  db.query(query, [product_id], (error, result) => {
    if (error) {
      return res.status(500).send(error.message);
    }

    if (result.affectedRows > 0) {
      return res.status(200).send("Removed From Cart");
    } else {
      return res.status(404).send("Product not found in cart");
    }
  });
});

module.exports = router;
