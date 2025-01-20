import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../Context/ThemeContext";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpError, setOtpError] = useState("");

  const [data, setData] = useState();

  console.log(data);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navgiation = useNavigate();
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await axiosInstance.post("/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });

      if (response.data.status) {
        setSuccess("Registration successful! Please verify your email.");
        setShowOtpModal(true); // Show OTP modal
      } else {
        setError(
          response.data.message || "Registration failed. Please try again."
        );
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    try {
      setOtpError("");
      const response = await axiosInstance.post("/verifyemail", {
        email: formData.email,
        password: formData.password,
        otp,
      });

      setData(response);
      if (response.data.status) {
        setSuccess("Verification successful! Redirecting to login...");
        navgiation("/user/dashboard");
      } else {
        setOtpError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setOtpError(err.response?.data?.message || "OTP verification failed.");
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`relative overflow-hidden py-16 sm:py-20 lg:py-24 text-center ${
          darkMode
            ? "bg-gradient-to-r from-gray-800 to-gray-900"
            : "bg-gradient-to-r from-indigo-600 to-blue-600"
        }`}
      >
        <div className="relative z-10 max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200"
          >
            Join Our Platform
          </motion.h1>
          <motion.p
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-sm sm:text-lg lg:text-xl ${
              darkMode ? "text-gray-400" : "text-purple-100"
            }`}
          >
            Create an account to unlock exclusive features and services.
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div
          className={`max-w-md sm:max-w-lg lg:max-w-xl mx-auto rounded-lg p-6 sm:p-8 lg:p-10 shadow-lg ${
            darkMode ? "bg-gray-800 text-white" : "bg-white"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Create Your Account
          </h2>
          {error && (
            <p className="text-red-500 text-center mb-4" aria-live="assertive">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-500 text-center mb-4" aria-live="polite">
              {success}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 text-gray-300 border-gray-600 focus:ring-indigo-500"
                    : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-indigo-500"
                }`}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 text-gray-300 border-gray-600 focus:ring-indigo-500"
                    : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-indigo-500"
                }`}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 text-gray-300 border-gray-600 focus:ring-indigo-500"
                    : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-indigo-500"
                }`}
                placeholder="Enter your password"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 text-gray-300 border-gray-600 focus:ring-indigo-500"
                    : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-indigo-500"
                }`}
                placeholder="Re-enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full py-3 font-medium rounded-lg transition ${
                darkMode
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <div
            className={`bg-white rounded-lg p-6 shadow-lg max-w-md ${
              darkMode ? "bg-gray-800" : ""
            }`}
          >
            <h3 className="text-xl font-bold mb-4">OTP Verification</h3>
            <p className="mb-4">
              Please enter the OTP sent to your email for verification.
            </p>
            {otpError && <p className="text-red-500 mb-4">{otpError}</p>}
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleOtpChange}
              className="w-full px-4 py-2 rounded-lg border mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowOtpModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleOtpVerification}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Verify OTP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;
