const express = require("express");
const router = express.Router();
const db = require("../configs/db");
const upload = require("../configs/multer");

// products
router.get("/products", (req, res) => {
  const query = "SELECT * FROM products";
  try {
    db.query(query, (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        const productWithBase64 = result.map((product) => {
          if (product.image) {
            return {
              ...product,
              image: product.image.toString("base64"),
            };
          }
        });
        res.status(200).json(productWithBase64);
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/product/:id", (req, res) => {
  const id = req.params.id;

  const query = "SELECT * FROM products WHERE id = ?";

  db.query(query, [id], (error, result) => {
    if (error) {
      res.status(500).send("Product doesn't found");
    } else {
      res.status(200).json(result);
    }
  });
});

router.post("/products", upload.single("image"), (req, res) => {
  const { name, price, type, category } = req.body;
  const image = req.file.buffer;

  const query =
    "INSERT INTO products(name, image, price, type, category, created_at ) VALUES (?,?,?,?,?,?)";
  db.query(
    query,
    [name, image, parseFloat(price), type, category, new Date()],
    (error, results) => {
      if (error) {
        console.error("Error adding product:", error);
        return res.status(500).send("Failed to add product.");
      }
      res.status(200).send("New Product Added");
    }
  );
});

// Products Update
router.put("/product/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const { name, price, type, category } = req.body;
  // console.log(req.body);

  const updateProduct = (queryParams) => {
    const query =
      "UPDATE products SET name = ?, price = ?, type = ?, category = ? WHERE id = ?";
    db.query(query, queryParams, (error, result) => {
      if (error) {
        console.error("Database error:", error);
        return res.status(500).send("Error updating product");
      }
      res.status(200).send("Product updated successfully");
    });
  };

  try {
    if (req.file && req.file.buffer) {
      const imageBuffer = req.file.buffer;
      const queryParams = [name, price, type, category, imageBuffer, id];

      const query =
        "UPDATE products SET name = ?, price = ?, type = ?, category = ?, image = ? WHERE id = ?";
      db.query(query, queryParams, (error, result) => {
        if (error) {
          console.error("Error while uploading image buffer:", error);
          return res.status(500).send("Error while uploading image buffer");
        }
        res.status(200).send("Image updated successfully");
      });
    } else {
      const queryParams = [name, price, type, category, id];
      updateProduct(queryParams);
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send("Server Error");
  }
});

router.delete("/product/:id", (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM products WHERE id = ?";

  db.query(query, [id], (error, result) => {
    if (error) {
      res.status(500).send(error, "Error while deleting");
    } else {
      res.status(200).send("Product Deleted");
    }
  });
});

// users
router.get("/users", async (req, res) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM users", (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
