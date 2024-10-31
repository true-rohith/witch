import React, { useEffect, useState } from "react";
import Card from "../Card";
import axios from "axios";
import { Link } from "react-router-dom";
import url from "../../../constants/url";

function NewDrops() {
  const [selected, setSelected] = useState("newdrops");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    let res = await axios.get(`${url}/products/${selected}`);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [selected]);

  return (
    <>
      <div className="w-full mt-[50px]">
        <div className="flex justify-center gap-5 items-center h-[40px]">
          <div
            className={`border border-gray-950 p-4 rounded-full cursor-pointer ${
              selected === "newdrops"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setSelected("newdrops")}
          >
            NEW DROPS
          </div>
          <div
            className={`border border-gray-950 p-4 rounded-full cursor-pointer ${
              selected === "mosttrending"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setSelected("mosttrending")}
          >
            MOST TRENDING
          </div>
        </div>
        <div className="items-center w-full my-[70px] px-[5%]">
          <div className="flex justify-start items-center max-w-full overflow-x-auto">
            {data.map((product) => (
              <div
                className="w-[45%] sm:w-[45%] md:w-[30%] lg:w-[22%] m-2"
                key={product.id}
              >
                <Card
                  id={product.id}
                  title={`${
                    product.name.length > 23
                      ? product.name.slice(0, 23) + "..."
                      : product.name
                  } `}
                  rating={"4"}
                  price={product.price}
                  sizes={["S", "M", "L", "XL", "XXL"]}
                  imageUrl={`data:image/jpeg;base64,${product.image}`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center w-full h-10 mb-[90px]">
          <Link to={"./AllProducts"}>
            <p className="border border-gray-300 py-2 px-12 rounded-sm tracking-[0.2rem] uppercase hover:border-gray-950">
              View All
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NewDrops;
