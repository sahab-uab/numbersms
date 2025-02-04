import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import axiosInstance from "../../api/axios";

const AdminAddCreditToUser = () => {
  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    amount: "",
    user_id: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.user_id) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post("/admin/addblance", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure token is properly retrieved
        },
      });

      console.log(response);

      toast.success(`${response.data.message}`);
      setFormData({ amount: "", user_id: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Add Credit to User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User ID Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              User ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              placeholder="Enter User ID"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Amount Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter Amount"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-200 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" size={20} />
            ) : (
              <CheckCircle size={20} className="mr-2" />
            )}
            {loading ? "Processing..." : "Add Credit"}
          </button>
        </form>

        {/* Error Alert */}
        <div className="mt-4 text-sm text-gray-600 text-center">
          Please make sure User ID and Amount are correct before submitting.
        </div>
      </div>
    </div>
  );
};

export default AdminAddCreditToUser;
