import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Product from "../components/Product";
import { useLocation } from "react-router-dom";
import axios from "axios";
import URL from "../../constants/url";

export default function ProductPage() {
  const url = URL;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const [data, setData] = useState({});

  async function fetchData() {
    try {
      const response = await axios.get(`${url}/product/${id}`);
      // console.log(response);
      if (response.status === 200) {
        setData(response.data[0]);
      } else {
        console.log(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
    window.scroll(0, 0);
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="m-20">
        <Product product={data} />
      </div>
      <Footer />
    </>
  );
}
