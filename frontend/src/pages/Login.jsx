import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../Context/ThemeContext";
import { useAuth } from "../Context/AuthContext"; // Import AuthContext
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { darkMode } = useTheme();
  const { login } = useAuth(); // Use login function from AuthContext
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await axiosInstance.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      // Get token and user info from the response
      const { token, data } = response.data;

      // Save token and user info in context
      login(token, data);

      // Navigate to user dashboard
      navigate("/user/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
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
          <form onSubmit={handleSubmit} className="space-y-6">
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
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
