import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Api/axios";
import { loginSuccess } from "../redux/authSlice";
import { X, Mail, Lock, Key } from "lucide-react";
import { toast } from "react-toastify";

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
      const { email, password } = formData;

      const response = await axiosInstance.post("/login", { email, password });
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
    setVerificationModal(false);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!forgotPasswordEmail) {
      setForgotPasswordError("Please enter your email.");
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/forget-password",
        { email: forgotPasswordEmail },
        { headers: { "Content-Type": "application/json" } }
      );
      setForgotPasswordSuccess(
        "Password reset instructions have been sent to your email."
      );
      setForgotPasswordEmail("");
      setModalOpen(false);
      setVerificationModal(true); // Open OTP verification modal
      toast.success("Check your email for password reset instructions.");
    } catch (err) {
      setForgotPasswordError(
        err.response?.data?.message ||
          "Error sending password reset instructions."
      );
    }
  };

  // Verification modal handling for OTP submission
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
      toast.success("Your password has been reset successfully.");
    } catch (err) {
      setVerificationError("Error resetting password.");
    }
  };

  return (
    <div className="background min-h-screen flex justify-center items-center">
      <section className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8 flex flex-col gap-5">
          <h2 className="text-3xl font-bold text-gray-800 uppercase">Login</h2>
          <p className="text-sm text-gray-500">
            Welcome back! Please login to your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-3 pl-12 pr-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full py-3 pl-12 pr-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className={`bg-[#824DEB] w-full hover:bg-white text-white hover:text-[#824DEB] px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center space-x-2 transition`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>OR</p>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={openModal}
            className="text-[#824DEB] hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <div className="mt-3 text-center text-sm text-gray-500">
          <p>
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-[#824DEB] hover:underline font-semibold"
            >
              Register here
            </button>
          </p>
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
                onClick={() => setModalOpen(false)}
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

      {/* OTP Verification Modal */}
      {verificationModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-gray-800">Enter OTP</h2>
              <button
                onClick={() => setVerificationModal(false)}
                className="w-[30px] h-[30px] group flex items-center justify-center bg-gray-100 rounded-lg"
              >
                <X className="w-[15px] duration-700 group-hover:scale-[1.3]" />
              </button>
            </div>
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
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 duration-700"
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
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 duration-700"
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
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 duration-700"
                  required
                />
              </div>

              {verificationError && (
                <p className="text-red-500 text-sm">{verificationError}</p>
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
    </div>
  );
};

export default LoginPage;
