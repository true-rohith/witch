import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loading, loaded } from "../../redux/slices/IsLoading";
import { loggedIn, loggedOut } from "../../redux/slices/isLoggedIn";
import Cookies from "universal-cookie";
import url from "../../constants/url";

const Login = () => {
  const Dispatch = useDispatch();
  const Navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.IsLoggedIn.value);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const cookie = new Cookies(null, { path: "/" });

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Dispatch(loading());

    await axios
      .post(`${url}/login`, {
        email: email,
        password: password,
      })
      .then(function (res) {
        if (res.status === 200) {
          cookie.set("token", res.data, { maxAge: 604800 });
          Dispatch(loggedIn());
          Navigate("/");
        } else {
          console.log("Email or Password Wrong");
        }
        Dispatch(loaded());
      })
      .catch((error) => {
        setError("Incorrect Email or Password");
        Dispatch(loaded());
        return;
      });
  };

  return (
    <>
      {isLoggedIn === true ? (
        <div>{Navigate("/")}</div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
              <p className="text-center mt-4">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  Register here
                </a>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
