const express = require("express");
const router = express.Router();
const db = require("../configs/db");

router.get("/", (req, res) => {
  const { category, order } = req.query;

  console.log(req.query);

  var query = "";

  if (!category) {
    if (order === "BESTSELLING") {
      query = "SELECT * FROM products";
    } else {
      query = `SELECT * FROM products ORDER BY price ${order}`;
    }
    db.query(query, (error, result) => {
      if (error) {
        return res.status(500).send(error);
      } else {
        const dataWithBase64 = result.map((item) => {
          return { ...item, image: item.image.toString("base64") };
        });
        return res.status(200).json(dataWithBase64);
      }
    });

    return;
  }

  const categoriesArray = Array.isArray(category) ? category : [category];

  const placeholders = categoriesArray.map(() => "?").join(",");

  if (order === "BESTSELLING") {
    query = `SELECT * FROM products WHERE category IN (${placeholders})`;
  } else {
    query = `SELECT * FROM products WHERE category IN (${placeholders}) ORDER BY price ${order}`;
  }

  db.query(query, categoriesArray, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (results.length > 0) {
      const dataWithBase64 = results.map((item) => {
        if (item.image) {
          return { ...item, image: item.image.toString("base64") };
        }
      });
      res.status(200).json(dataWithBase64);
    } else {
      res.status(200).json([]);
    }
  });
});

// router.get("/:order", (req, res) => {
//   const param = req.params.order;
//   const query = `SELECT * FROM products ORDER BY price ${param}`;

//   db.query(query, [param], (error, result) => {
//     if (error) {
//       res.status(500).send(error);
//     } else {
//       const resultWithBase64 = result.map((item) => {
//         return { ...item, image: item.image.toString("base64") };
//       });
//       res.status(200).json(resultWithBase64);
//     }
//   });
// });

module.exports = router;
