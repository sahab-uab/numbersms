import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../Context/ThemeContext";

const Login = () => {
  const { darkMode } = useTheme();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    verificationCode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsPopupOpen(true); // Open the popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Hero Section */}
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
        {/* Background Animation */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 w-full h-full opacity-10"
          style={{
            background:
              "radial-gradient(circle at center, white 0%, transparent 70%)",
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-lg">
          {/* Title */}
          <motion.h1
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200"
          >
            Welcome Back
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-base sm:text-lg md:text-xl lg:text-2xl ${
              darkMode ? "text-gray-400" : "text-purple-100"
            }`}
          >
            Login to access your account and manage your services.
          </motion.p>
        </div>
      </motion.div>

      {/* Login Form Section */}
      <div className="container mx-auto px-4 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div
          className={`max-w-md sm:max-w-lg lg:max-w-xl mx-auto rounded-lg p-6 sm:p-8 lg:p-10 shadow-lg ${
            darkMode ? "bg-gray-800 text-white" : "bg-white"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Login to Your Account
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
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

            {/* Password */}
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

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3 font-medium rounded-lg transition ${
                darkMode
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Login
            </button>
          </form>
          <p
            className={`mt-6 text-center text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Don't have an account?{" "}
            <a
              href="/register"
              className={`font-medium ${
                darkMode
                  ? "text-blue-400 hover:text-white"
                  : "text-blue-600 hover:text-blue-800"
              }`}
            >
              Register
            </a>
          </p>
        </div>
      </div>

      {/* Verification Code Popup */}
      {isPopupOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 ${
            darkMode ? "bg-gray-900 bg-opacity-80" : "bg-gray-900 bg-opacity-50"
          }`}
        >
          <div
            className={`p-6 w-full max-w-sm rounded-lg shadow-lg ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          >
            <h3 className="text-xl font-bold mb-4 text-center">
              Enter Verification Code
            </h3>
            <p
              className={`text-sm text-center mb-6 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              A verification code has been sent to your email. Please enter it
              below.
            </p>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="verificationCode"
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Verification Code
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  name="verificationCode"
                  value={formData.verificationCode}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 text-gray-300 border-gray-600 focus:ring-indigo-500"
                      : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-indigo-500"
                  }`}
                  placeholder="Enter the code"
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full py-3 rounded-lg font-medium transition ${
                  darkMode
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Verify
              </button>
              <button
                type="button"
                onClick={handleClosePopup}
                className={`w-full py-3 mt-2 rounded-lg font-medium transition ${
                  darkMode
                    ? "bg-gray-600 hover:bg-gray-500 text-white"
                    : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                }`}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
