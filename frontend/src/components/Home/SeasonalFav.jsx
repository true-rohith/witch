import React from "react";
import { Link } from "react-router-dom";

const SeasonalFav = () => {
  return (
    <div>
      <div className="flex justify-center items-center w-full mb-12">
        <h1 className="text-4xl tracking-tight">SEASONAL FAVS ☀️</h1>
      </div>

      <div className="flex flex-wrap w-full justify-center lg:justify-evenly my-12 gap-4">
        <div className="w-[40%] sm:w-[40%] lg:w-[22%] relative rounded-xl overflow-hidden transform transition-transform ease-out duration-500 cursor-pointer hover:scale-105 hover:brightness-90">
          <Link to={"/allproducts"}>
            <img
              className="w-full"
              src="../../../src/assets/SeasonalFav/image1.png"
              alt="Trousers"
            />
            <div className="absolute bottom-5 left-3 text-white text-2xl uppercase">
              Trousers
            </div>
          </Link>
        </div>

        <div className="w-[40%] sm:w-[40%] lg:w-[22%] relative rounded-xl overflow-hidden transform transition-transform ease-out duration-500 cursor-pointer hover:scale-105 hover:brightness-90">
          <Link to={"/allproducts"}>
            <img
              className="w-full"
              src="../../../src/assets/SeasonalFav/image2.png"
              alt="Cargos"
            />
            <div className="absolute bottom-5 left-3 text-white text-2xl uppercase">
              Cargos
            </div>
          </Link>
        </div>

        <div className="w-[40%] sm:w-[40%] lg:w-[22%] relative rounded-xl overflow-hidden transform transition-transform ease-out duration-500 cursor-pointer hover:scale-105 hover:brightness-90">
          <Link to={"/allproducts"}>
            <img
              className="w-full"
              src="../../../src/assets/SeasonalFav/image3.png"
              alt="Overshirts"
            />
            <div className="absolute bottom-5 left-3 text-white text-2xl uppercase">
              Overshirts
            </div>
          </Link>
        </div>

        <div className="w-[40%] sm:w-[40%] lg:w-[22%] relative rounded-xl overflow-hidden transform transition-transform ease-out duration-500 cursor-pointer hover:scale-105 hover:brightness-90">
          <Link to={"/allproducts"}>
            <img
              className="w-full"
              src="../../../src/assets/SeasonalFav/image4.png"
              alt="Oversized Tees"
            />
            <div className="absolute bottom-5 left-3 text-white text-2xl uppercase">
              Oversized Tees
            </div>
          </Link>
        </div>
      </div>

      <div className="w-full my-8">
        <Link to={"/AllProducts"}>
          <img
            className="w-full"
            src="../../../src/assets/SeasonalFav/banner1.png"
            alt="Seasonal Banner"
          />
        </Link>
      </div>
    </div>
  );
};

export default SeasonalFav;
