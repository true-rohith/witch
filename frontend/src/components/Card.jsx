import React, { useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ id, title, rating, price, sizes, imageUrl }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <Link to={`/product?id=${id}`} className="block">
      <div className="max-w-sm mx-auto bg-[#ffffff] shadow-lg rounded-lg overflow-hidden flex flex-col ">
        {/* Image with zoom effect */}
        <div className="relative flex-shrink-0 h-80 overflow-hidden group max-w-[300px]">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover object-top transform transition-transform duration-300 ease-in-out group-hover:scale-110 "
          />
          {/* Overlay for hover effect */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-in-out"></div>
        </div>

        {/* Text Content */}
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500 mr-2">
              {"★".repeat(rating)}
              {"☆".repeat(5 - rating)}
            </span>
            <span className="text-gray-600">({rating})</span>
          </div>
          <p className="mt-2 text-xl font-bold text-gray-900">₹ {price}</p>

          {/* Size Options */}
          <div className="mt-4">
            <p className="text-gray-600 mb-2">Select Size:</p>
            <div className="flex space-x-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`py-2 px-4 border rounded-lg ${
                    selectedSize === size
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200 text-gray-800"
                  } transition-colors duration-200 ease-in-out hover:bg-slate-700 hover:text-white`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
