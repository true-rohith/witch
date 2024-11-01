import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      className="max-w-xs h-[200px] flex gap-2 bg-white rounded-lg shadow-md overflow-hidden"
      to={`/product?id=${product.id}`}
    >
      <img
        className="w-[40%] object-cover"
        src={`data:image/jpeg;base64,${product.image}`}
        alt={product.name}
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-500">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
