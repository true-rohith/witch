import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import URL from "../../constants/url";
import { useDispatch, useSelector } from "react-redux";
import { cartUpdated } from "../../redux/slices/IsCartOpen";

const Product = ({ product }) => {
  const url = URL;
  const { name, price, image, id } = product;
  const userInfo = useSelector((state) => state.UserInfo.value);
  const updated = useSelector((state) => state.isCartOpen.updated);

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const [existInCart, setExistInCart] = useState(false);

  const shippingCost = 40;

  const [selectedSize, setSelectedSize] = useState("");
  const [pincode, setPincode] = useState("");
  const [user, setUser] = useState({});

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleCartInsert = async () => {
    try {
      await axios.post(`${url}/cart`, {
        user_id: userInfo.id,
        product_id: id,
      });
      dispatch(cartUpdated());
    } catch (error) {
      console.log(error);
    }
  };

  const handleCartRemove = async () => {
    try {
      const res = await axios.delete(`${url}/cart/${id}`);
      console.log(res);
      dispatch(cartUpdated());
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfProductExistInCart = async (product_id) => {
    try {
      const res = await axios.get(`${url}/cart/${userInfo.id}/${product_id}`);
      if (res.status === 201) {
        setExistInCart(true);
      } else if (res.status === 200) {
        setExistInCart(false);
      }
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfProductExistInCart(product.id);
  }, [product, updated]);

  return (
    <div className="container mx-auto md:p-6 flex flex-col lg:flex-row lg:space-x-8">
      {/* Image Section */}
      <div className="lg:w-1/2">
        <div className="relative w-full">
          <img
            src={`data:image/jpeg;base64,${product.image}`} // Replace with actual image source
            alt="Product"
            className="w-full h-auto object-cover"
          />
          <Link to={"/allproducts"}>
            <button className="absolute bottom-4 left-4 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm">
              View Similar
            </button>
          </Link>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="lg:w-1/2">
        <h1 className="text-3xl font-semibold text-gray-800">{name}</h1>
        <p className="text-xl font-semibold text-gray-700 mt-2">INR {price}</p>
        <p className="text-gray-500">(incl. of all taxes)</p>

        {/* Discount Offers */}
        <div className="mt-4 text-gray-700">
          <p>
            Get this for INR {price}{" "}
            <span className="text-sm text-gray-500">
              Flat 10% off on first purchase. Code: APP10
            </span>
          </p>
          <p>
            Get this for INR 1,039{" "}
            <span className="text-sm text-gray-500">
              Flat 20% off on 4599 purchase. Code: FLAT20
            </span>
          </p>
          <p>
            Get this for INR 1,104{" "}
            <span className="text-sm text-gray-500">
              Flat 15% off on 2999 purchase. Code: FLAT15
            </span>
          </p>
          <p>
            Get this for INR 1,169{" "}
            <span className="text-sm text-gray-500">
              Flat 10% off on 1999 purchase. Code: FLAT10
            </span>
          </p>
        </div>

        {/* Size Selection */}
        <h2 className="mt-6 text-lg font-semibold">Select a Size</h2>
        <div className="flex space-x-4 mt-2">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <button
              key={size}
              onClick={() => handleSizeSelect(size)}
              className={`border border-gray-300 rounded-lg px-4 py-2 text-sm ${
                selectedSize === size
                  ? "bg-gray-800 text-white"
                  : "text-gray-700"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Add to Cart */}
        {!existInCart ? (
          <button
            className="mt-4 w-full border border-gray-800 text-gray-800 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={handleCartInsert}
          >
            Add to Cart
          </button>
        ) : (
          <button
            className="mt-4 w-full border border-gray-800 text-gray-800 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={handleCartRemove}
          >
            Remove From Cart
          </button>
        )}

        {/* Additional Sections */}
        <div className="mt-6 space-y-2">
          {[
            "EMI / PAY IN 3 OFFERS",
            "DESCRIPTION",
            "MORE INFORMATION",
            "RETURNS & EXCHANGE INFORMATION",
          ].map((section) => (
            <button
              key={section}
              className="w-full text-left border-b border-gray-200 py-2 text-gray-700"
            >
              {section}
            </button>
          ))}
        </div>

        {/* Delivery Checker */}
        <div className="mt-6 p-4 border border-gray-300 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">
            Estimated Delivery Date & COD Checker
          </h3>
          <div className="flex mt-2">
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter your pincode"
              className="border border-gray-300 p-2 rounded-l-lg w-full"
            />
            <button className="bg-gray-800 text-white px-4 rounded-r-lg">
              Check
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

// break

// import React, { useState } from "react";

// const Product = () => {
// const [selectedSize, setSelectedSize] = useState("");
// const [pincode, setPincode] = useState("");

// const handleSizeSelect = (size) => {
//   setSelectedSize(size);
// };

//   return (
//     <div className="container mx-auto p-6 flex flex-col lg:flex-row lg:space-x-8">
//       {/* Image Section */}
//       <div className="lg:w-1/2">
//         <div className="relative">
//           <img
//             src="https://via.placeholder.com/500" // Replace with actual image source
//             alt="Product"
//             className="w-full h-auto object-cover"
//           />
//           <button className="absolute bottom-4 left-4 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm">
//             View Similar
//           </button>
//         </div>
//       </div>

//       {/* Product Details Section */}
//       <div className="lg:w-1/2">
//         <h1 className="text-3xl font-semibold text-gray-800">
//           RED SLIM FIT LINEN SHIRT
//         </h1>
//         <p className="text-xl font-semibold text-gray-700 mt-2">INR 1,299</p>
//         <p className="text-gray-500">(incl. of all taxes)</p>

//         {/* Discount Offers */}
//         <div className="mt-4 text-gray-700">
//           <p>
//             Get this for INR 1,169{" "}
//             <span className="text-sm text-gray-500">
//               Flat 10% off on first purchase. Code: APP10
//             </span>
//           </p>
//           <p>
//             Get this for INR 1,039{" "}
//             <span className="text-sm text-gray-500">
//               Flat 20% off on 4599 purchase. Code: FLAT20
//             </span>
//           </p>
//           <p>
//             Get this for INR 1,104{" "}
//             <span className="text-sm text-gray-500">
//               Flat 15% off on 2999 purchase. Code: FLAT15
//             </span>
//           </p>
//           <p>
//             Get this for INR 1,169{" "}
//             <span className="text-sm text-gray-500">
//               Flat 10% off on 1999 purchase. Code: FLAT10
//             </span>
//           </p>
//         </div>

//         {/* Size Selection */}
//         <h2 className="mt-6 text-lg font-semibold">Select a Size</h2>
//         <div className="flex space-x-4 mt-2">
//           {["S", "M", "L", "XL", "XXL"].map((size) => (
//             <button
//               key={size}
//               onClick={() => handleSizeSelect(size)}
//               className={`border border-gray-300 rounded-lg px-4 py-2 text-sm ${
//                 selectedSize === size
//                   ? "bg-gray-800 text-white"
//                   : "text-gray-700"
//               }`}
//             >
//               {size}
//             </button>
//           ))}
//         </div>

//         {/* Add to Wishlist */}
//         <button
//           className="mt-4 w-full border border-gray-800 text-gray-800 py-3 rounded-lg hover:bg-gray-100 transition-colors"
//           disabled={!selectedSize}
//         >
//           Add to Wishlist
//         </button>

//         {/* Additional Sections */}
//         <div className="mt-6 space-y-2">
//           {[
//             "EMI / PAY IN 3 OFFERS",
//             "DESCRIPTION",
//             "MORE INFORMATION",
//             "RETURNS & EXCHANGE INFORMATION",
//           ].map((section) => (
//             <button
//               key={section}
//               className="w-full text-left border-b border-gray-200 py-2 text-gray-700"
//             >
//               {section}
//             </button>
//           ))}
//         </div>

//         {/* Delivery Checker */}
//         <div className="mt-6 p-4 border border-gray-300 rounded-lg">
//           <h3 className="text-lg font-semibold text-gray-700">
//             Estimated Delivery Date & COD Checker
//           </h3>
//           <div className="flex mt-2">
//             <input
//               type="text"
//               value={pincode}
//               onChange={(e) => setPincode(e.target.value)}
//               placeholder="Enter your pincode"
//               className="border border-gray-300 p-2 rounded-l-lg w-full"
//             />
//             <button className="bg-gray-800 text-white px-4 rounded-r-lg">
//               Check
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;
