// src/AddProductForm.js
import axios from "axios";
import React, { useState } from "react";
import url from "../../constants/url";

const AddProductForm = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", price);
    formData.append("type", type);
    formData.append("category", category);
    formData.append("image", image);

    try {
      await axios.post(`${url}/admin/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Clear form fields after successful submission
      setProductName("");
      setPrice("");
      setType("");
      setCategory("");
      setImage("");
      setSuccessMessage("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="productName">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="type">
            Type
          </label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="image">
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mt-2">{successMessage}</p>
      )}
    </div>
  );
};

export default AddProductForm;
