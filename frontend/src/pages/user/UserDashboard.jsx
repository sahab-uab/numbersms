import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../slices/userInfoSlice";

const UserDashboard = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token)); // Dispatch the thunk
    }
  }, [dispatch, token]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">User Dashboard</h1>
      </div>

      {/* User Info Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome, {userData?.data?.name}
        </h2>
        <p className="text-gray-600 mb-4">Email: {userData?.data?.email}</p>

        {/* Total Credit Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Total Credit
            </h3>
            <p className="text-3xl font-bold text-green-600">
              ${userData?.data?.coin}
            </p>
          </div>
          <button
            onClick={() => alert("Add Credit functionality")}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Add Credit
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Action 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <i className="fas fa-credit-card text-blue-500 text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Manage Credit
          </h3>
          <p className="text-gray-600 mb-4">
            View and manage your available credit balance.
          </p>
          <button
            onClick={() => alert("Manage Credit")}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Go to Credit Management
          </button>
        </div>

        {/* Action 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <i className="fas fa-share-alt text-green-500 text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Share Credit
          </h3>
          <p className="text-gray-600 mb-4">
            Share your credit with others easily.
          </p>
          <button
            onClick={() => alert("Share Credit")}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
          >
            Share Credit
          </button>
        </div>

        {/* Action 3 */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <div className="bg-purple-100 p-4 rounded-full mb-4">
            <i className="fas fa-history text-purple-500 text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Transaction History
          </h3>
          <p className="text-gray-600 mb-4">
            Track your past transactions and payments.
          </p>
          <button
            onClick={() => alert("View History")}
            className="px-4 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition"
          >
            View History
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
