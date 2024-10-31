import React from "react";
import { Link } from "react-router-dom";

const TrendingNow = () => {
  return (
    <div>
      <div className="flex justify-center items-center w-full my-14">
        <h1 className="text-4xl tracking-tight">Trending Now</h1>
      </div>
      <div className="flex flex-wrap w-full justify-center lg:justify-evenly my-12 gap-4">
        <div className="w-[40%] sm:w-[40%] lg:w-[22%] relative rounded-xl overflow-hidden transform transition-transform ease-out duration-500 cursor-pointer hover:scale-105 hover:brightness-90">
          <Link to={"/allproducts"}>
            <img
              className="w-full"
              src="../../../src/assets/TrendingNow/image1.png"
              alt="All Blacks"
            />
            <div className="absolute bottom-5 left-3 text-white text-2xl uppercase">
              All Blacks
            </div>
          </Link>
        </div>
        <div className="w-[40%] sm:w-[40%] lg:w-[22%] relative rounded-xl overflow-hidden transform transition-transform ease-out duration-500 cursor-pointer hover:scale-105 hover:brightness-90">
          <Link to={"/allproducts"}>
            <img
              className="w-full"
              src="../../../src/assets/TrendingNow/image2.png"
              alt="Solid Shirts"
            />
            <div className="absolute bottom-5 left-3 text-white text-2xl uppercase">
              Solid Shirts
            </div>
          </Link>
        </div>
        <div className="w-[40%] sm:w-[40%] lg:w-[22%] relative rounded-xl overflow-hidden transform transition-transform ease-out duration-500 cursor-pointer hover:scale-105 hover:brightness-90">
          <Link to={"/allproducts"}>
            <img
              className="w-full"
              src="../../../src/assets/TrendingNow/image3.png"
              alt="Denims"
            />
            <div className="absolute bottom-5 left-3 text-white text-2xl uppercase">
              Denims
            </div>
          </Link>
        </div>
        <div className="w-[40%] sm:w-[40%] lg:w-[22%] relative rounded-xl overflow-hidden transform transition-transform ease-out duration-500 cursor-pointer hover:scale-105 hover:brightness-90">
          <Link to={"/allproducts"}>
            <img
              className="w-full"
              src="../../../src/assets/TrendingNow/image4.png"
              alt="Printed Shirts"
            />
            <div className="absolute bottom-5 left-3 text-white text-2xl uppercase">
              Printed Shirts
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrendingNow;
