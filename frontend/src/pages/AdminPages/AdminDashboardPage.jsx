import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allUserFetching } from "../../redux/getAllUserSlice";
import { allTransationsFetching } from "../../redux/getAllTransation";
import { AdminBlanceFetch } from "../../redux/adminBlance";

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.allUser);
  const { transations } = useSelector((state) => state.transations);
  const { adminblance } = useSelector((state) => state.adminblance);

  useEffect(() => {
    dispatch(allUserFetching());
  }, [dispatch]);

  useEffect(() => {
    dispatch(allTransationsFetching());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(AdminBlanceFetch());
  }, [dispatch]);
  


  const totalUsers = items?.data?.length || 0;

  const totalTransations = transations?.data?.length || 0;

  const totaladminblance = adminblance?.data?.length || 0;

  return (
    <div className="flex h-screen">
      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">
              Total Blance
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {totaladminblance}
            </p>{" "}
            {/* Replace with actual value */}
          </div>
          {/* Dashboard Cards */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>
            <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">
              Total Transactions
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {totalTransations}
            </p>{" "}
            {/* Replace with actual value */}
          </div>
        </div>

        {/* Recent Activities Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Recent Activities
          </h2>
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left text-gray-600">Activity</th>
                <th className="py-2 px-4 text-left text-gray-600">Date</th>
                <th className="py-2 px-4 text-left text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* You can map through recent activities here */}
              <tr>
                <td className="py-2 px-4">User Added</td>
                <td className="py-2 px-4">2025-02-04</td>
                <td className="py-2 px-4 text-green-600">Completed</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Transaction Updated</td>
                <td className="py-2 px-4">2025-02-03</td>
                <td className="py-2 px-4 text-yellow-600">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
