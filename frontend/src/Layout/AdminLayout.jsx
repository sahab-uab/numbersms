import { useState, useEffect } from "react";
import Sidebar from "../Components/AdminComponents/Sidebar";
import { Outlet } from "react-router-dom";
import TokenRefreshOnRouteChange from "../utils/TokenRefreshOnRouteChange";
import ScrollToTop from "../utils/ScrollToTop";
import { ClipLoader } from "react-spinners";

const AdminLayout = () => {
  const [isTokenRefreshed, setIsTokenRefreshed] = useState(false);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        await TokenRefreshOnRouteChange();
        setIsTokenRefreshed(true);
      } catch (error) {
        console.error("Token refresh failed:", error);
        setIsTokenRefreshed(true);
      }
    };

    refreshToken();
  }, []);

  if (!isTokenRefreshed) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <ClipLoader size={50} color="#4F46E5" loading={true} />
          <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 transition-all duration-300">
        <ScrollToTop>
          <Outlet />
        </ScrollToTop>
      </main>
    </div>
  );
};

export default AdminLayout;
