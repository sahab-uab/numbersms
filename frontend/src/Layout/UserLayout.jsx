import Navbar from "../components/Navbar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCreditCard,
  FaShieldAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa"; // Import icons
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlices";

const UserLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Clears auth state
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto flex gap-5">
        <aside className="w-64 bg-white shadow-md rounded-lg h-screen">
          <div className="mt-6 p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Menu</h2>
            <div className="flex flex-col gap-2">
              <Link
                to="/user/dashboard"
                className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-200"
              >
                <FaTachometerAlt className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/user/credit"
                className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-200"
              >
                <FaCreditCard className="w-5 h-5" />
                <span>Credit</span>
              </Link>
              <Link
                to="/user/verification"
                className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-200"
              >
                <FaShieldAlt className="w-5 h-5" />
                <span>Verification</span>
              </Link>
              <Link
                to="/user/settings"
                className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-200"
              >
                <FaCog className="w-5 h-5" />
                <span>Settings</span>
              </Link>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 rounded-md text-red-600 hover:bg-red-500 hover:text-white transition-all duration-200"
              >
                <FaSignOutAlt className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        <div className="flex-1 mt-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
