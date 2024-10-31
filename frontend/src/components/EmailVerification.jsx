import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loaded, loading } from "../../redux/slices/IsLoading";
import url from "../../constants/url";

const OTPVerification = ({ name, email, password, otp }) => {
  const [inputOtp, setInputOtp] = useState();
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(60); // Timer starts from 60 seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const [timeRemaining, setTimeRemaining] = useState(5); // Initial time is 5 seconds

  const Navigate = useNavigate();
  const Dispatch = useDispatch();

  // Function to handle OTP input change
  const handleOTPChange = (e) => {
    setInputOtp(Number(e.target.value));
  };

  // Function to handle OTP verification on form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (inputOtp === otp) {
      function startCoundDown() {
        setIsVerified(true);
        let temp = timeRemaining;
        const countDown = setInterval(async () => {
          temp = temp - 1;
          setTimeRemaining(temp);

          if (temp <= 0) {
            clearInterval(countDown);
            Dispatch(loading());
            await axios.post(`${url}/register/accountCreatedEmail`, { email });
            Dispatch(loaded());
            Navigate("/login");
          }
        }, 1000);
      }
      let res = await axios.post(`${url}/register`, {
        name,
        email,
        password,
      });

      if (res.status === 201) {
        startCoundDown();
      } else {
        setError("Server Problem, Try Again After Some Time.");
        Navigate("/register");
      }
    } else {
      setError(`Invalid OTP. Please try again. ${otp}`);
    }
  };

  // Timer logic to enable "Resend OTP" button after 1 minute
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false); // Enable the "Resend OTP" button after the timer ends
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Resend OTP logic
  const handleResendOTP = () => {
    // Reset OTP field, error message, and timer
    setInputOtp("");
    setError("");
    setTimer(60); // Reset timer to 60 seconds
    setIsResendDisabled(true); // Disable the button again
    console.log("OTP has been resent!"); // Simulate OTP resend logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Email Verification
        </h2>

        {!isVerified ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-gray-600">
              We've sent an OTP to your email. Please enter it below to verify
              your account.
            </p>

            {/* OTP Input */}
            <div>
              <label
                htmlFor="otp"
                className="block text-gray-700 font-bold mb-2"
              >
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={inputOtp}
                onChange={handleOTPChange}
                className={`border p-2 w-full rounded-lg ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            {/* Timer and Resend OTP */}
            <div className="flex items-center justify-between mt-4">
              <p className="text-gray-600">
                Resend OTP in: <span className="font-bold">{timer}s</span>
              </p>
              <button
                type="button"
                className={`${
                  isResendDisabled
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                } py-2 px-4 rounded-lg transition-colors duration-300`}
                onClick={handleResendOTP}
                disabled={isResendDisabled}
              >
                Resend OTP
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 mt-4"
            >
              Verify
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-evenly min-h-[40vh] bg-gray-100">
            <h1 className="text-2xl font-extrabold ">
              Account Created Successfully.
            </h1>
            <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold">
              {timeRemaining}
            </div>
            <p className="text-xl">Please Login to Continue.</p>
            <p className="text-xl ">Redirecting to login page.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OTPVerification;
