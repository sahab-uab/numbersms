import React from "react";
import Sidebar from "../Components/AdminComponents/Sidebar";
import { Outlet } from "react-router-dom";
import TokenRefreshOnRouteChange from "../utils/TokenRefreshOnRouteChange";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Token refresh component to handle route change */}
      <TokenRefreshOnRouteChange />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
