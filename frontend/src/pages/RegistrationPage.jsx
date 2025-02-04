import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Api/axios";
import { otpVerifySuccess, registerSuccess } from "../redux/authSlice";

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
    <div className="min-h-screen flex justify-center items-center py-10 bg-gray-100">
      <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl max-w-4xl w-full flex flex-col md:flex-row p-6 md:p-12">
        {/* Left Section */}
        <div className="md:w-1/2 w-full flex flex-col justify-center px-6 md:px-12">
          <h2 className="font-bold text-4xl ">Create Your Account</h2>
          <p className="text-sm mt-4 ">
            Join our platform by creating a new account.
          </p>

          {/* Form */}
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
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002D74] placeholder-gray-500"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002D74] placeholder-gray-500"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002D74] placeholder-gray-500"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002D74] placeholder-gray-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 font-medium rounded-xl bg-black text-white hover:bg-[#206ab1] focus:outline-none"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 w-full mt-10 md:mt-0 flex justify-center">
          <img
            className="rounded-2xl max-h-[500px] md:max-h-[1600px] object-cover"
            src="https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmcmVzaHxlbnwwfDF8fHwxNzEyMTU4MDk0fDA&ixlib=rb-4.0.3&q=80&w=1080"
            alt="registration form image"
          />
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
              className="w-full px-4 py-2 rounded-xl border mb-4 focus:ring-2 focus:ring-[#002D74]"
            />

            <button
              onClick={handleOtpVerification}
              className="px-4 py-2 bg-[#002D74] text-white rounded-md"
            >
              Verify OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationPage;
