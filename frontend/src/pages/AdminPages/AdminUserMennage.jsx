import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { allUserFetching } from "../../redux/getAllUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { Eye } from "lucide-react";
import axiosInstance from "../../Api/axios";

const AdminUserMennage = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.allUser);

  const [currentPage, setCurrentPage] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const itemsPerPage = 10;
  const mainData = items?.data || [];

  useEffect(() => {
    if (mainData.length === 0 && status !== "loading...") {
      dispatch(allUserFetching()); // Fetch users if they are not already loaded
    }
  }, [dispatch, mainData.length, status]);

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  // Close modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  const deleteUser = async () => {
    if (!selectedUser) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedUser.name}?`
    );
    if (!confirmDelete) return;

    try {
      const response = await axiosInstance.post("admin/deleteuser", {
        id: selectedUser.id,
      });

      if (response.status === 200) {
        alert("User deleted successfully");
        closeModal();
        dispatch(allUserFetching()); // Refresh user list after deletion
      } else {
        alert(response.data.message || "Failed to delete user");
      }
    } catch (error) {
      console.log(error);
      alert("Error deleting user");
    }
  };

  // user role chanage
  const roleChange = async () => {
    if (!selectedUser) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to chnage this user role ${selectedUser.role} to ${
        selectedUser.role == "user" ? "Admin" : "User"
      }?`
    );
    if (!confirmDelete) return;
    try {
      const response = await axiosInstance.post("admin/userolechnage", {
        id: selectedUser.id,
        role: selectedUser.role == "user" ? "admin" : "user",
      });

      if (response.status === 200) {
        alert(response.data.message);
        closeModal();
        dispatch(allUserFetching());
      } else {
        alert(response.data.message || "Failed to role change");
      }
    } catch (error) {
      console.log(error);
      alert("Error change role");
    }
  };

  // Get current items based on pagination
  const indexOfLastUser = (currentPage + 1) * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = mainData.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-center uppercase">
          manage Users
        </h2>
      </div>

      <table className="min-w-full border-collapse table-auto mt-5">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-3 px-6 text-left">User ID</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Coin</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <td className="py-3 px-6">{user.id}</td>
                <td className="py-3 px-6 capitalize">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">
                  {user.role == "admin" ? "--" : "$." + user.coin}
                </td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => openModal(user)}
                    className="flex items-center gap-x-3 bg-gray-100 text-gray-600 py-2 px-3 rounded-md"
                  >
                    <Eye /> View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-3 px-6 text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {mainData.length > 0 && (
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={Math.ceil(mainData.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      )}

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-[50%]">
            <div className="flex justify-between items-center mb-4 border-b  border-gray-100 pb-5">
              <h2 className="text-xl font-semibold text-gray-600 uppercase">
                User Details
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 w-[40px] h-[40px] flex items-center justify-center bg-gray-100"
              >
                X
              </button>
            </div>
            {selectedUser && (
              <div className="border border-gray-100 rounded-lg">
                <p className="mb-2 border-b border-gray-100 py-3 px-5">
                  <strong className="text-gray-950">Name:</strong>{" "}
                  <span className="pl-3">{selectedUser.name}</span>
                </p>
                <p className="mb-2 border-b border-gray-100 py-3 px-5">
                  <strong className="text-gray-950">Email:</strong>{" "}
                  <span className="pl-3">{selectedUser.email}</span>
                </p>
                {selectedUser.role == "user" ? (
                  <p className="mb-2 border-b border-gray-100 py-3 px-5">
                    <strong className="text-gray-950">Coin:</strong>{" "}
                    <span className="pl-3">{selectedUser.coin}</span>
                  </p>
                ) : (
                  ""
                )}
                <p className="mb-2 py-3 px-5">
                  <strong className="text-gray-950">Role:</strong>{" "}
                  <span className="pl-3">{selectedUser.role}</span>
                </p>
              </div>
            )}

            <div className="mt-5 flex items-center justify-end gap-x-5">
              <button
                className="bg-gray-100 px-4 py-2 text-gray-500 rounded-md"
                onClick={roleChange}
              >
                {selectedUser.role == "user" ? "Make admin" : "Make user"}
              </button>
              <button
                onClick={deleteUser}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserMennage;
