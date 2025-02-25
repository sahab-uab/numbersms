import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../Api/axios";
import { toast } from "react-toastify";
import { fetchUserProfile } from "../../redux/singleUserProfileSlice";

const AdminAccountSettingsPage = () => {
  const dispatch = useDispatch();
  const { userData, loading } = useSelector((state) => state.userInfo);
  const { token } = useSelector((state) => state.auth);

  const [loadingPasswordChange, setLoadingPasswordChange] = useState(false);

  const [formData, setFormData] = useState({
    name: userData?.data?.name || "",
    email: userData?.data?.email || "",
  });

  const [modal, setModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoadingPasswordChange(true);

    try {
      const response = await axiosInstance.post("/upadte-profile", {
        name: formData.name,
      });

      if (response?.status) {
        dispatch(fetchUserProfile(token));
        setModal(false);
        toast.success("Profile updated successfully!");
      } else {
        alert(response?.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPasswordChange(false);
    }
  };

  const handleChangePassword = () => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword === passwordData.confirmPassword) {
      setLoadingPasswordChange(true);

      try {
        const response = await axiosInstance.post("/chanage-password", {
          old_password: passwordData.oldPassword,
          password: passwordData.newPassword,
          password_confirmation: passwordData.confirmPassword,
        });

        console.log(response);
        if (response?.status) {
          setModal(false);
          alert("Password changed successfully!");
        } else {
          alert(response?.message || "Password change failed.");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while changing password.");
      } finally {
        setLoadingPasswordChange(false); // Hide loader after process completes
      }
    } else {
      alert("Passwords do not match.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        User Settings
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            readOnly
            value={formData.email}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* Password Change Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleChangePassword}
          className="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Change Password
        </button>
      </div>

      {/* Modal for Password Change */}
      {modal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Change Password
            </h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-600"
                >
                  Current Password:
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-600"
                >
                  Confirm New Password:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Change Password
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
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

export default AdminAccountSettingsPage;
