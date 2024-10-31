import axios from "axios";
import React, { useEffect, useState } from "react";
import url from "../../constants/url";
import { useDispatch, useSelector } from "react-redux";
import { cartUpdated } from "../../redux/slices/IsCartOpen";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userInfo = useSelector((state) => state.UserInfo.value);
  const isCartUpdated = useSelector((state) => state.isCartOpen.updated);

  const dispatch = useDispatch();

  const fetchCartData = async (id) => {
    try {
      const res = await axios.get(`${url}/cart/${id}`);
      setCartItems(res.data);
      // console.log(res.data);
      // console.log(cartItems);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(cartItems);

  const handleQuantityChange = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleRemoveItem = async (id) => {
    try {
      const res = await axios.delete(`${url}/cart/${id}`);
      // setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      dispatch(cartUpdated());
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (userInfo && userInfo.id) {
      fetchCartData(userInfo.id);
    }
  }, [userInfo, isCartUpdated]);

  return (
    <div className="p-4 max-w-lg mx-auto overflow-scroll">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4 bg-white shadow-lg rounded-lg p-4"
            >
              <Link to={`/product?id=${item.id}`}>
                <img
                  src={`data:image/jpeg;base64,${item.image}`}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </Link>
              <div className="ml-4 flex-grow">
                <Link to={`/product?id=${item.id}`}>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">
                    ${parseInt(item.price).toFixed(2)}
                  </p>
                </Link>
                <div className="mt-2">
                  <label className="text-gray-600 mr-2">Quantity:</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    className="w-16 border border-gray-300 rounded-lg p-2"
                    min="1"
                  />
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="ml-4 text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-4">
            <p className="text-lg font-semibold text-gray-800">
              Total: ${totalPrice.toFixed(2)}
            </p>
            <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
