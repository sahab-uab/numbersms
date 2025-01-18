import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../Context/ThemeContext";

const Registration = () => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
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
          className="absolute inset-0 w-full h-full opacity-10 overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at center, white 0%, transparent 70%)",
          }}
        />

        {/* Content */}
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

      {/* Registration Form Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div
          className={`max-w-md sm:max-w-lg lg:max-w-xl mx-auto rounded-lg p-6 sm:p-8 lg:p-10 shadow-lg ${
            darkMode ? "bg-gray-800 text-white" : "bg-white"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
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

            {/* Confirm Password */}
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

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3 font-medium rounded-lg transition ${
                darkMode
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Register
            </button>
          </form>

          {/* Redirect to Sign In */}
          <p
            className={`mt-6 text-center text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Already have an account?{" "}
            <a
              href="/signin"
              className={`font-medium ${
                darkMode
                  ? "text-blue-400 hover:text-white"
                  : "text-blue-600 hover:text-blue-800"
              }`}
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
