import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
import { otpVerifySuccess, registerSuccess } from "../slices/authSlices";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.auth); // Get stored email

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [otp, setOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);

  // Handle input changes
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle Registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

      const response = await axiosInstance.post("/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });

      if (response.data.status) {
        dispatch(registerSuccess({ email: formData.email }));
        setMessage({
          type: "success",
          text: "Registration successful! Verify your email.",
        });
        setShowOtpModal(true);
      } else {
        setMessage({
          type: "error",
          text: response.data.message || "Registration failed.",
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "An error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP Verification
  const handleOtpVerification = async () => {
    try {
      setMessage({ type: "", text: "" });

      const response = await axiosInstance.post("/verifyemail", {
        email,
        otp,
      });

      if (response.data.status) {
        dispatch(
          otpVerifySuccess({
            token: response.data.token,
            user: response.data.user,
          })
        );
        setMessage({
          type: "success",
          text: "Verification successful! Redirecting...",
        });
        setShowOtpModal(false);
        navigate("/user/dashboard");
      } else {
        setMessage({ type: "error", text: "Invalid OTP. Please try again." });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "OTP verification failed.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Registration Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative overflow-hidden py-16 text-center bg-gradient-to-r from-indigo-600 to-blue-600"
      >
        <div className="max-w-screen-lg mx-auto px-4">
          <motion.h1
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-4 text-white"
          >
            Join Our Platform
          </motion.h1>
        </div>
      </motion.div>

      {/* Registration Form */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto rounded-lg p-6 shadow-lg bg-white">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create Your Account
          </h2>

          {message.text && (
            <p
              className={`text-center mb-4 ${
                message.type === "error" ? "text-red-500" : "text-green-500"
              }`}
            >
              {message.text}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md">
            <h3 className="text-xl font-bold mb-4">OTP Verification</h3>
            <p className="mb-4">Enter the OTP sent to your email.</p>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border mb-4"
            />

            <button
              onClick={handleOtpVerification}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Verify OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;
