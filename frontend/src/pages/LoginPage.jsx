import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Api/axios";
import { loginSuccess } from "../redux/authSlice";
import { X } from "lucide-react";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [verificationModal, setVerificationModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordError, setForgotPasswordError] = useState("");
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState("");

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationError, setVerificationError] = useState("");

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
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Modal handling for forgot password
  const openModal = () => {
    setModalOpen(true);
    setForgotPasswordError("");
    setForgotPasswordSuccess("");
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!forgotPasswordEmail) {
      setForgotPasswordError("Please enter your email.");
      return;
    }

    try {
      // Ensure correct headers if necessary
      const response = await axiosInstance.post(
        "/forget-password", // Check if this endpoint is correct
        { email: forgotPasswordEmail },
        {
          headers: {
            "Content-Type": "application/json", // Ensure correct content-type
          },
        }
      );
      setForgotPasswordSuccess(
        "Password reset instructions have been sent to your email."
      );
      setForgotPasswordEmail("");
      setModalOpen(false);
      setVerificationModal(true);
    } catch (err) {
      // Handle the error appropriately
      if (err.response) {
        setForgotPasswordError(
          err.response.data.message || "An error occurred."
        );
      } else {
        setForgotPasswordError("Error sending password reset instructions.");
      }
    }
  };

  // Verification modal handling
  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword || !confirmPassword) {
      setVerificationError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setVerificationError("Passwords do not match.");
      return;
    }

    try {
      const response = await axiosInstance.post("/reset-password", {
        otp,
        password: newPassword,
        password_confirmation: confirmPassword,
      });
      setVerificationError("");
      setForgotPasswordSuccess("Password reset successful.");
      setVerificationModal(false);
    } catch (err) {
      setVerificationError("Error resetting password.");
    }
  };

  return (
    <div>
      <section className="bg-gray-100 min-h-screen flex justify-center items-center py-10">
        <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl max-w-4xl w-full flex flex-col md:flex-row p-6 md:p-12">
          {/* Left Section */}
          <div className="md:w-1/2 w-full flex flex-col justify-center px-6 md:px-12">
            <h2 className="font-bold text-4xl ">Login</h2>
            <p className="text-sm mt-4 ">
              If you are already a member, easily log in now.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
              <input
                className="p-3 mt-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002D74] placeholder-gray-500"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <div className="relative">
                <input
                  className="p-3 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-[#002D74] placeholder-gray-500"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                className="bg-black text-white py-3 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>OR</p>
            </div>

            <div className="mt-10 text-sm text-center">
              <button
                onClick={openModal}
                className="text-[#002D74] hover:underline"
              >
                Forgot password?
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="md:w-1/2 w-full mt-10 md:mt-0 flex justify-center">
            <img
              className="rounded-2xl max-h-[500px] md:max-h-[1600px] object-cover"
              src="https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmcmVzaHxlbnwwfDF8fHwxNzEyMTU4MDk0fDA&ixlib=rb-4.0.3&q=80&w=1080"
              alt="login form image"
            />
          </div>
        </div>
      </section>

      {/* Forgot Password Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-gray-800">
                Forgot Password
              </h2>
              <button
                onClick={closeModal}
                className="w-[30px] h-[30px] group flex items-center justify-center bg-gray-100 rounded-lg"
              >
                <X className="w-[15px] duration-700 group-hover:scale-[1.3]" />
              </button>
            </div>
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="forgotPasswordEmail"
                  className="block text-sm font-medium text-gray-600"
                >
                  Enter your email:
                </label>
                <input
                  type="email"
                  id="forgotPasswordEmail"
                  name="forgotPasswordEmail"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 duration-700"
                  required
                />
              </div>

              {forgotPasswordError && (
                <p className="text-red-500 text-sm">{forgotPasswordError}</p>
              )}
              {forgotPasswordSuccess && (
                <p className="text-green-500 text-sm">
                  {forgotPasswordSuccess}
                </p>
              )}

              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="py-2 w-full px-4 bg-blue-500 duration-700 text-white text-[14px] font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Verification Modal */}
      {verificationModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Reset Password
            </h2>
            <form onSubmit={handleVerificationSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-600"
                >
                  OTP:
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-600"
                >
                  New Password:
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-600"
                >
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {verificationError && (
                <p className="text-red-500 text-sm">{verificationError}</p>
              )}

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
