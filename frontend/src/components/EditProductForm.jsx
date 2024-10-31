import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loading, loaded } from "../../redux/slices/IsLoading";
import url from "../../constants/url";

const EditProductForm = ({ id }) => {
  const isLoading = useSelector((state) => state.IsLoading.value); // Get loading state from Redux
  const Dispatch = useDispatch();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    type: "",
    category: "",
  });
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);

  // Fetch product details when component mounts or id changes
  const fetchProduct = async () => {
    Dispatch(loading());
    try {
      const response = await axios.get(`${url}/admin/product/${id}`);
      setProduct(response.data[0]); // Assuming response data is an array with product at index 0
    } catch (error) {
      setError("Error fetching product.");
      console.error("Error fetching product:", error);
    } finally {
      Dispatch(loaded());
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Handle form submission to update the product
  const handleSubmit = async (e) => {
    e.preventDefault();
    Dispatch(loading());

    // Use FormData to handle the product and image data
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("type", product.type);
    formData.append("category", product.category);
    if (image) {
      formData.append("image", image); // Append the image if it's selected
    }

    try {
      await axios.put(`${url}/admin/product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Handle successful update (e.g., redirect or reset form)
      window.location.reload(); // Optionally refresh the page
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    } finally {
      Dispatch(loaded());
    }
  };

  // Handle product deletion
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      Dispatch(loading());
      try {
        await axios.delete(`${url}/admin/product/${id}`);
        window.location.reload(); // Refresh after delete
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      } finally {
        Dispatch(loaded());
      }
    }
  };

  // Handle input changes for product fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  // Render error if fetching the product failed
  if (error) return <p>{error}</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-100 rounded-md max-w-[600px]"
      encType="multipart/form-data"
    >
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

      <div className="mb-2">
        <label className="block">Product Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block">Product Price</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block">Product Image</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block">Product Type</label>
        <input
          type="text"
          name="type"
          value={product.type}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block">Product Category</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`bg-blue-500 text-white p-2 rounded-md ${
          isLoading && "opacity-50 cursor-not-allowed"
        }`}
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </button>

      <button
        type="button"
        onClick={handleDelete}
        className="bg-red-500 text-white p-2 rounded-md ml-2"
      >
        Delete Product
      </button>
    </form>
  );
};

export default EditProductForm;
