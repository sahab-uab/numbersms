import React, { useState } from "react";

const AdminAllUser = () => {
  // Sample data for the users (this would come from an API in a real scenario)
  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", credit: 1200 },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      credit: 1500,
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      credit: 1000,
    },
  ];

  // State to manage the modal visibility and selected user details
  const [modal, setModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Function to handle showing user details in the modal
  const showUserDetails = (user) => {
    setSelectedUser(user);
    setModal(true); // Show modal
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">All Users</h1>
      </div>

      {/* User Table */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 text-left font-semibold">ID</th>
              <th className="px-4 py-2 text-left font-semibold">Name</th>
              <th className="px-4 py-2 text-left font-semibold">Email</th>
              <th className="px-4 py-2 text-left font-semibold">Credit</th>
              <th className="px-4 py-2 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 font-semibold text-blue-600">
                  ${user.credit}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => showUserDetails(user)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <i className="fas fa-eye"></i> View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for User Details */}
      {modal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              User Details
            </h2>

            <p className="text-gray-600 mb-2">
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Credit:</strong> ${selectedUser.credit}
            </p>

            {/* Close Button */}
            <button
              onClick={() => setModal(false)} // Close the modal
              className="px-4 py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllUser;
