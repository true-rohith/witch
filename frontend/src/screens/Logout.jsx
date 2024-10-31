import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loaded, loading } from "../../redux/slices/IsLoading";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { loggedOut } from "../../redux/slices/isLoggedIn";
import url from "../../constants/url";

const Logout = () => {
  const cookie = new Cookies();

  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  function logOut() {
    Dispatch(loading());
    axios
      .get(`${url}/logout`)
      .then(() => {
        cookie.remove("token");
        Dispatch(loggedOut());
        Dispatch(loaded());
        Navigate("/");
      })
      .catch((err) => {
        console.log(err);
        Dispatch(loaded());
        Navigate("/");
      });
  }
  useEffect(() => {
    logOut();
  }, []);
  return <div></div>;
};

export default Logout;
