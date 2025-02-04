import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { allUserFetching } from "../../redux/getAllUserSlice";

const AdminUserPage = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.allUser);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // You can adjust this number based on your needs
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

  // Get current items based on pagination
  const indexOfLastUser = (currentPage + 1) * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = mainData.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-3xl font-bold text-center mb-6">All Users</h2>

      <table className="min-w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-3 px-6 text-left">User ID</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Coin</th>
            <th className="py-3 px-6 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6">{user.id}</td>
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{user.coin}</td>
                <td className="py-3 px-6">{user.role}</td>
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
    </div>
  );
};

export default AdminUserPage;
