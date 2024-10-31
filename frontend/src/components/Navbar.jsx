import React, { useState } from "react";
import { CiSearch, CiHeart } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FaOpencart } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartClicked } from "../../redux/slices/IsCartOpen";
import { searchOpen } from "../../redux/slices/IsSearchOpen";

const Navbar = () => {
  const isCartOpen = useSelector((state) => state.isCartOpen.value);
  const isLoggedIn = useSelector((state) => state.IsLoggedIn.value);
  // console.log(isLoggedIn);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#ffffff] shadow-md fixed top-0 w-full z-10 border border-spacing-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo on the Middle */}
          <Link to={"/"}>
            <div className="flex-shrink-0">
              <a href="#" className="text-xl font-bold ">
                <img src={logo} alt="Logo" width={80} />
              </a>
            </div>
          </Link>

          {/* Navigation links on the right */}
          <div className="hidden sm:flex sm:space-x-8 items-center">
            <a
              href="/profile"
              className=" text-black hover:text-[#aec3b0] px-3 py-2 rounded-md text-sm font-medium"
            >
              <CgProfile size={24} />
            </a>
            <a
              href="#"
              onClick={() => dispatch(searchOpen())}
              className=" text-black hover:text-[#aec3b0] px-3 py-2 rounded-md text-sm font-medium"
            >
              <CiSearch size={24} />
            </a>
            {isLoggedIn && (
              <a
                className=" text-black hover:text-[#aec3b0] px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                onClick={() => dispatch(cartClicked())}
              >
                {isCartOpen ? (
                  <IoMdClose size={24} />
                ) : (
                  <FaOpencart size={24} />
                )}
              </a>
            )}
            {isLoggedIn ? (
              <a
                href="/logout"
                className=" text-black hover:text-[#aec3b0] px-3 py-2 rounded-md text-sm font-medium"
              >
                Log Out
              </a>
            ) : (
              <a
                href="/login"
                className=" text-black hover:text-[#aec3b0] px-3 py-2 rounded-md text-sm font-medium"
              >
                Log In
              </a>
            )}
          </div>

          {/* Mobile menu button on the right */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="bg-gray-800 text-[#aec3b0] inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        style={{ maxHeight: isMenuOpen ? "40rem" : "0" }}
        className={`transition-max-height duration-300 overflow-hidden `}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 text-[#aec3b0]">
          <a
            href="#"
            className=" text-black hover:text-[#aec3b0] block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </a>
          <a
            href="#"
            className=" text-black hover:text-[#aec3b0] block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </a>
          <a
            href="#"
            className=" text-black hover:text-[#aec3b0] block px-3 py-2 rounded-md text-base font-medium"
          >
            Services
          </a>
          <a
            href="#"
            className=" text-black hover:text-[#aec3b0] block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
