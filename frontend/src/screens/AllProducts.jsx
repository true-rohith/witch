import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import URL from "../../constants/url";
import { FaChevronUp } from "react-icons/fa";
import axios from "axios";

const AllProducts = () => {
  const url = URL;
  const checkboxArray = [
    "shirts",
    "t-shirts",
    "trousers",
    "jeans",
    "shorts",
    "cargopants",
    "overshirts",
  ];

  const [checkedCategory, setCheckedCategory] = useState([]);
  const [productsData, setProductsData] = useState([]);

  const [sortOpen, setSortOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("BESTSELLING");

  const handleChange = (e) => {
    if (e.target.checked) {
      setCheckedCategory((prev) => [...prev, e.target.name]);
    } else {
      setCheckedCategory((prev) =>
        prev.filter((item) => item !== e.target.name)
      );
    }
  };

  const fetchData = async () => {
    setSortOpen(false);
    try {
      const response = await axios.get(`${url}/allproducts`, {
        params: {
          category: checkedCategory,
          order: sortOrder,
        },
      });

      if (response.status === 200) {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setProductsData(response.data);
        } else {
          console.log("No Products found");
        }
      } else {
        console.log(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [checkedCategory, sortOrder]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="relative top-[80px] flex flex-col lg:flex-row justify-between w-full h-auto mb-28 p-4 lg:p-8">
        {/* Sticky Sidebar for Category Filters */}
        <div className="min-w-[200px] text-center mb-8 lg:mb-0">
          <div className="sticky top-20">
            <h1 className="my-1 border border-gray-500 p-2">Select Category</h1>
            <div className="flex flex-col gap-4 max-h-52 border border-gray-500 p-4 overflow-y-auto">
              {checkboxArray.map((item, index) => (
                <div key={index} className="flex justify-between max-w-full">
                  <label htmlFor={item}>{item}</label>
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name={item}
                    id={item}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full">
          <div className="relative flex flex-col float-end w-[200px] mb-9 mr-16">
            <div
              onClick={() => setSortOpen((prev) => !prev)}
              className="flex justify-center items-center w-[200px] h-11 border border-gray-500 cursor-pointer"
            >
              <div className="flex w-full justify-center gap-2">
                {sortOrder}
                {sortOpen ? (
                  <FaChevronUp className="transition-all" size={24} />
                ) : (
                  <FaChevronUp
                    className="rotate-180 transition-all"
                    size={24}
                  />
                )}
              </div>
            </div>
            {sortOpen && (
              <div className="absolute bg-white w-full flex flex-col gap-5 py-3 justify-center items-center top-[50px] z-10 border border-gray-600">
                <div
                  onClick={() => setSortOrder("BESTSELLING")}
                  className={`w-full h-full text-center cursor-pointer ${
                    sortOrder === "BESTSELLING"
                      ? "text-white bg-black"
                      : "text-black bg-white"
                  }`}
                >
                  Best Selling
                </div>
                <div
                  onClick={() => setSortOrder("ASC")}
                  className={`w-full h-full text-center cursor-pointer ${
                    sortOrder === "ASC"
                      ? "text-white bg-black"
                      : "text-black bg-white"
                  }`}
                >
                  Price (Low to High)
                </div>
                <div
                  onClick={() => setSortOrder("DESC")}
                  className={`w-full h-full text-center cursor-pointer ${
                    sortOrder === "DESC"
                      ? "text-white bg-black"
                      : "text-black bg-white"
                  }`}
                >
                  Price (High to Low)
                </div>
              </div>
            )}
          </div>

          {/* Responsive Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-around w-full">
            {productsData.map((product) => (
              <div className="m-2" key={product.id}>
                <Card
                  id={product.id}
                  title={`${
                    product.name.length > 23
                      ? product.name.slice(0, 23) + "..."
                      : product.name
                  } `}
                  rating={"4"} // Placeholder for now
                  price={product.price}
                  sizes={["S", "M", "L", "XL"]} // Placeholder sizes
                  imageUrl={`data:image/jpeg;base64,${product.image}`} // Assuming the image is Base64
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllProducts;
