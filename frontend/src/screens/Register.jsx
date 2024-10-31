import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import OTPVerification from "../components/EmailVerification";
import { loading, loaded } from "../../redux/slices/IsLoading";
import { useSelector, useDispatch } from "react-redux";
import url from "../../constants/url";
const Register = () => {
  const Dispatch = useDispatch();
  const Navigate = useNavigate();
  const IsLoading = useSelector((state) => state.IsLoading.value);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [generatedOTP, setGeneratedOTP] = useState("");

  const [errors, setErrors] = useState({});

  const [emailVerify, setEmailVerify] = useState(false);

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form validation logic
  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.email.includes("@"))
      newErrors.email = "Valid email is required.";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  };
  // Submit form logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const res = await axios.post(`${url}/register/emailCheck`, {
        email: formData.email,
      });

      if (res.status === 201) {
        const otp = Math.floor(100000 + Math.random() * 900000);
        setGeneratedOTP(otp);
        Dispatch(loading());
        console.log(IsLoading);

        async function sendOTP() {
          const res = await axios.post(`${url}/register/emailOTP`, {
            email: formData.email,
            otp,
          });
          console.log("OTP SENT SUCCESSFULLY");
          setEmailVerify(true);
          Dispatch(loaded());
          console.log(IsLoading);
        }

        sendOTP();
      } else if (res.status === 409) {
        setErrors({ email: "Email Already Exists" });
      }
    } catch (error) {
      console.error("Register Page Error", error);
      if (error.response && error.response.status === 409) {
        setErrors({ email: "Email Already Exists" });
      } else
        setErrors({ general: "An error occurred. Please try again later." });
    }
  };

  return (
    <>
      {emailVerify ? (
        <OTPVerification
          otp={generatedOTP}
          name={formData.username}
          email={formData.email}
          password={formData.password}
        />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Register
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Input */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`border p-2 w-full rounded-lg ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your username"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`border p-2 w-full rounded-lg ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`border p-2 w-full rounded-lg ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              {/* Confirm Password Input */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`border p-2 w-full rounded-lg ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Register
              </button>
              {errors && (
                <p className="text-red-500 text-sm mt-1">{errors.general}</p>
              )}
              <p className="text-center mt-4">
                Have an account?{" "}
                <a
                  href="/login"
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
