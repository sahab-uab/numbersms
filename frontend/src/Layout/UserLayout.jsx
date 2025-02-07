import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../Components/UserComponents/UserSidebar";
import TokenRefreshOnRouteChange from "../utils/TokenRefreshOnRouteChange";
import ScrollToTop from "../utils/ScrollToTop";
import { ClipLoader } from "react-spinners";

const UserLayout = () => {
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
    <div className="flex container mx-auto">
      {/* Sidebar */}
      <div>
        <UserSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <ScrollToTop>
          <Outlet />
        </ScrollToTop>
      </div>
    </div>
  );
};

export default UserLayout;
