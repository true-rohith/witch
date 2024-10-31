import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

import profileLogo from "../assets/profile/profileLogo.png";
import ordersLogo from "../assets/profile/ordersLogo.png";
import locationLogo from "../assets/profile/locationLogo.png";
import logoutLogo from "../assets/profile/logoutLogo.png";
import editLogo from "../assets/profile/editLogo.png";
import cancleLogo from "../assets/profile/cancleLogo.png";

import URL from "../../constants/url";
import userData from "../../user_info/userInfo";

const ProfilePage = () => {
  const url = URL;

  const [isActive, setActive] = useState("profile");
  const [isEditable, setIsEditable] = useState(false);
  const [isAddressEdit, setIsAddressEdit] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const { name, email, address } = formData; // Destructuring for cleaner JSX

  // Toggle Edit Mode
  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fetch user data from server
  async function fetchUserData() {
    try {
      const response = await userData();
      setFormData({
        name: response[0].name,
        email: response[0].email,
        address: response[0].address,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  // Handle form submission to save updated profile data
  const handleProfileSubmit = async () => {
    try {
      const response = await axios.put(`${url}/profile`, formData); // PUT request to update profile
      console.log("Profile updated successfully:", response.data);
      setIsEditable(false); // Disable editing after saving
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleFormSubmit = async () => {
    try {
      const response = await axios.post(`${url}/profile/address`, formData);
      console.log("Address Added !!!");
      setIsAddressEdit(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="my-20 mx-10 md:mx-20 lg:mx-72">
        <div className="flex flex-col md:flex-row h-full gap-7">
          {/* left side */}
          <div className="flex flex-col h-full gap-7 min-w-[250px] border border-gray-400 rounded-3xl shadow-gray-500 shadow-md">
            {/* user name top */}
            <div className="flex justify-center items-center gap-2 w-full h-20 border border-gray-500 rounded-3xl shadow-gray-500 shadow-lg">
              {/* logo */}
              <div className="flex text-2xl font-semibold justify-center items-center rounded-full bg-slate-500 text-black w-11 h-11 uppercase">
                {formData.name[0]}
              </div>

              {/* name */}
              <div>
                <p>{name || "User"}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 py-6">
              {/* profile section */}
              <div
                className={`w-full border-l-4 cursor-pointer hover:border-gray-500 ${
                  isActive === "profile"
                    ? "border-gray-500"
                    : "border-transparent"
                }`}
                id="profile"
                onClick={() => setActive("profile")}
              >
                <div className="mx-6 items-center">
                  <img
                    src={profileLogo}
                    className="w-[24px] inline-block"
                    alt=""
                  />
                  <p className="inline-block ml-3">My Profile</p>
                </div>
              </div>

              {/* address section */}
              <div
                className={`border-l-4 cursor-pointer hover:border-gray-500 ${
                  isActive === "location"
                    ? "border-gray-500"
                    : "border-transparent"
                }`}
                id="location"
                onClick={() => setActive("location")}
              >
                <div className="mx-6 items-center">
                  <img
                    src={locationLogo}
                    className="w-[24px] inline-block"
                    alt=""
                  />
                  <p className="inline-block ml-3">Delivery Address</p>
                </div>
              </div>

              {/* orders */}
              <div
                className={`border-l-4 cursor-pointer hover:border-gray-500 ${
                  isActive === "orders"
                    ? "border-gray-500"
                    : "border-transparent"
                }`}
                id="orders"
                onClick={() => setActive("orders")}
              >
                <div className="mx-6 items-center">
                  <img
                    src={ordersLogo}
                    className="w-[24px] inline-block"
                    alt=""
                  />
                  <p className="inline-block ml-3">My Orders</p>
                </div>
              </div>

              {/* log out */}
              <div
                className={`border-l-4 cursor-pointer hover:border-gray-500 ${
                  isActive === "logout"
                    ? "border-gray-500"
                    : "border-transparent"
                }`}
                id="logout"
                onClick={() => setActive("logout")}
              >
                <div className="mx-6 items-center">
                  <img
                    src={logoutLogo}
                    className="w-[24px] inline-block"
                    alt=""
                  />
                  <a href="/logout" className="inline-block ml-3">
                    Log Out
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* right side */}
          <div className="w-full">
            {/* my profile */}
            {isActive === "profile" && (
              <div>
                <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold mb-4">
                      Account Information
                    </h2>
                    <div>
                      {!isEditable ? (
                        <img
                          className="w-[24px] cursor-pointer"
                          src={editLogo}
                          alt="Edit"
                          onClick={toggleEdit}
                        />
                      ) : (
                        <img
                          className="w-[24px] cursor-pointer"
                          src={cancleLogo}
                          alt="Cancel"
                          onClick={toggleEdit}
                        />
                      )}
                    </div>
                  </div>

                  <form>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md ${
                          isEditable
                            ? "bg-white"
                            : "bg-gray-100 cursor-not-allowed"
                        }`}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        disabled={true}
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed`}
                      />
                    </div>

                    {isEditable && (
                      <button
                        type="button"
                        onClick={handleProfileSubmit}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Save
                      </button>
                    )}
                  </form>
                </div>
              </div>
            )}
            {/* delivery address */}
            {isActive === "location" && (
              <div className="w-full gap-2 shadow-lg shadow-gray-400 border border-gray-400 h-[13rem] rounded-xl px-3 flex items-center my-4 mx-3">
                {!address ? (
                  <div
                    onClick={() => setIsAddressEdit(true)}
                    className="flex items-center justify-center min-w-[200px] h-[90%] rounded-xl border-dashed border-gray-400 hover:bg-slate-200 cursor-pointer"
                  >
                    <p className="text-lg">Add Delivery Address</p>
                  </div>
                ) : (
                  <div className="flex flex-col justify-between h-full w-full p-2">
                    <div className="flex justify-between">
                      <p className="text-xl">{address}</p>
                      <button
                        className="text-blue-600 font-semibold"
                        onClick={() => setIsAddressEdit(true)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                )}
                {isAddressEdit && (
                  <form
                    onSubmit={handleFormSubmit}
                    className="flex flex-col w-full gap-2"
                  >
                    <textarea
                      value={address}
                      name="address"
                      onChange={handleInputChange}
                      className="border border-gray-400 rounded-md h-20"
                      placeholder="Enter your delivery address"
                      required
                    ></textarea>
                    <button className="text-white bg-blue-600 hover:bg-blue-700 rounded-md">
                      Add Address
                    </button>
                  </form>
                )}
              </div>
            )}
            {/* orders section */}
            {isActive === "orders" && (
              <div className="my-4">
                {" "}
                {/* Placeholder for orders content */}
                <p className="text-lg">Your orders will be displayed here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
