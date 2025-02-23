import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Api/axios";
import { otpVerifySuccess, registerSuccess } from "../redux/authSlice";
import { User, Mail, Lock, Key } from "lucide-react";
import { toast } from "react-toastify";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.auth);

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

  const handleOtpVerification = async () => {
    try {
      setMessage({ type: "", text: "" });

      const response = await axiosInstance.post("/verifyemail", {
        email,
        otp,
        password: formData.password,
      });

      if (response.data.status) {
        dispatch(
          otpVerifySuccess({
            token: response.data.token,
            user: response.data.data,
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
    <div className="background min-h-screen flex justify-center items-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Your Account
        </h2>
        <p className="text-center text-sm text-gray-500 mt-4">
          Join our platform by creating a new account.
        </p>

        {message.text && (
          <p
            className={`text-center mb-4 ${
              message.type === "error" ? "text-red-500" : "text-green-500"
            }`}
          >
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          {/* Name Input */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 pl-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500"
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 pl-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 pl-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 pl-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-[#824DEB] w-full hover:bg-white text-white hover:text-[#824DEB] px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center space-x-2 transition`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* OTP Modal */}
        {showOtpModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">OTP Verification</h3>
              <p className="mb-4">Enter the OTP sent to your email.</p>

              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-xl border focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <button
                onClick={handleOtpVerification}
                className="w-full mt-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none"
              >
                Verify OTP
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;
