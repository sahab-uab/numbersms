import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../slices/authSlices";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, data, status, message } = response.data;

      if (status === false) {
        setError(message);
      } else if (status === true) {
        dispatch(loginSuccess({ token, user: data }));

        if (data.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }

      // Dispatch login action
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 mt-20">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-md mx-auto rounded-lg p-6 shadow-lg bg-white">
          <h2 className="text-2xl font-bold text-center mb-6">
            {isAuthenticated
              ? "You are already logged in!"
              : "Login to Your Account"}
          </h2>

          {!isAuthenticated && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border bg-gray-50 text-gray-900"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2 text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border bg-gray-50 text-gray-900"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          )}

          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
