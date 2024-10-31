import axios from "axios";
import React, { useEffect, useState } from "react";
import AddProductForm from "../components/AddProductFrom";
import EditProductForm from "../components/EditProductForm";
import url from "../../constants/url";

const Admin = () => {
  const [selected, setSelected] = useState("allProducts");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [addProduct, setAddProduct] = useState(false);
  const [loading, setLoading] = useState(true);

  async function fetchingData() {
    try {
      //   let ordersData = await axios.get(`${url}/admin/orders`);
      //   setOrders(ordersData.data);
      let productsData = await axios.get(`${url}/admin/products`);
      setProducts(productsData.data);
      let usersData = await axios.get(`${url}/admin/users`);
      setUsers(usersData.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }

  function handleEdit(id) {
    setIsEdit(true);
    setEditId(id); // Set the edit ID
  }

  useEffect(() => {
    fetchingData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="text-xl w-full text-center border-y border-gray-700 mt-3 p-3 fixed ">
        <h1 className="font-bold">Admin Panel</h1>
      </div>
      <div className="flex md:flex-row h-screen relative m-2 ">
        <div className="flex flex-col gap-2 border-r border-gray-500 h-full md:w-1/4 fixed mt-[70px]">
          <div
            className={`${
              selected === "allProducts"
                ? "bg-black text-white"
                : "text-black bg-white"
            } cursor-pointer inline-block p-2 rounded-md m-1 border border-gray-500 text-center`}
            onClick={() => setSelected("allProducts")}
          >
            All Products
          </div>
          <div
            className={`${
              selected === "orders"
                ? "bg-black text-white"
                : "text-black bg-white"
            } cursor-pointer inline-block p-2 rounded-md m-1 border border-gray-500 text-center`}
            onClick={() => setSelected("orders")}
          >
            Orders
          </div>
          <div
            className={`${
              selected === "users"
                ? "bg-black text-white"
                : "text-black bg-white"
            } cursor-pointer inline-block p-2 rounded-md m-1 border border-gray-500 text-center`}
            onClick={() => setSelected("users")}
          >
            Users
          </div>
        </div>

        <div className="w-full md:w-3/4 overflow-x-auto mt-[70px] ml-[25%] ">
          {/* Products Table */}
          <div
            className={`${
              selected === "allProducts" ? "block" : "hidden"
            } p-2 `}
          >
            <div
              className="border border-gray-700 inline-block m-2 p-3 rounded-md cursor-pointer "
              onClick={() => {
                if (isEdit) {
                  setIsEdit(false);
                  return;
                }
                setAddProduct((prev) => !prev);
              }}
            >
              {addProduct || isEdit ? "Exit" : "Add A New Product"}
            </div>
            <div>
              <p>Total Products :- {products.length}</p>
            </div>
            {!isEdit && addProduct && <AddProductForm />}
            {isEdit && <EditProductForm id={editId} />}
            {!isEdit && (
              <table className="min-w-full border border-gray-700 text-center m-2 ">
                <thead>
                  <tr className="bg-black text-white h-[40px]">
                    <th className="border border-x-white">ID</th>
                    <th className="border border-x-white">Image</th>
                    <th className="border border-x-white">Product Name</th>
                    <th className="border border-x-white">Price</th>
                    <th className="border border-x-white">Type</th>
                    <th className="border border-x-white">Category</th>
                    <th className="border border-x-white">Edit</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="border border-gray-700">{product.id}</td>
                      <td className="border border-gray-700 ">
                        <div className="flex justify-center items-center">
                          <img
                            src={`data:image/jpeg;base64,${product.image}`}
                            alt={product.name}
                            className="max-w-[100px] h-auto"
                          />
                        </div>
                      </td>
                      <td className="border border-gray-700 max-w-[100px]">
                        {product.name}
                      </td>
                      <td className="border border-gray-700">
                        {product.price}
                      </td>
                      <td className="border border-gray-700">{product.type}</td>
                      <td className="border border-gray-700">
                        {product.category}
                      </td>
                      <td
                        className="border border-gray-700 cursor-pointer"
                        onClick={() => handleEdit(product.id)}
                      >
                        Edit
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Orders Table */}
          <div className={`${selected === "orders" ? "block" : "hidden"}`}>
            <table className="min-w-full border border-gray-700 text-center m-2">
              <thead>
                <tr className="bg-black text-white h-[40px]">
                  <th className="border border-x-white">ID</th>
                  <th className="border border-x-white">Name</th>
                  <th className="border border-x-white">Email</th>
                  <th className="border border-x-white">Address</th>
                  <th className="border border-x-white">Orders</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="border border-gray-700">{order.id}</td>
                    <td className="border border-gray-700">{order.name}</td>
                    <td className="border border-gray-700">{order.email}</td>
                    <td className="border border-gray-700">{order.address}</td>
                    <td className="border border-gray-700">{order.orders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Users Table */}
          <div className={`${selected === "users" ? "block" : "hidden"} p-2`}>
            <table className="min-w-full border border-gray-700 text-center m-2">
              <thead>
                <tr className="bg-black text-white h-[40px]">
                  <th className="border border-x-white">ID</th>
                  <th className="border border-x-white">Name</th>
                  <th className="border border-x-white">Email</th>
                  <th className="border border-x-white">Address</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="border border-gray-700">{user.id}</td>
                    <td className="border border-gray-700">{user.name}</td>
                    <td className="border border-gray-700">{user.email}</td>
                    <td className="border border-gray-700">{user.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
