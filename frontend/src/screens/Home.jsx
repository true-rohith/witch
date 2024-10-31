import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import MainCarousal from "../components/Home/MainCarousal";
import NewDrops from "../components/Home/NewDrops";
import SeasonalFav from "../components/Home/SeasonalFav";
import ShirtTshirtJeans from "../components/Home/Shirt-Tshirt-Jeans";
import TrendingNow from "../components/Home/TrendingNow";
import ShortsTrousers from "../components/Home/Shorts-Trousers";

function Home() {
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      <MainCarousal />
      <NewDrops />
      <SeasonalFav />
      <ShirtTshirtJeans />
      <TrendingNow />
      <ShortsTrousers />
      <Footer />
    </>
  );
}

export default Home;
