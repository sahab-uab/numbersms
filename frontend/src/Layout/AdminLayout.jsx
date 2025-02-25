import Sidebar from "../Components/AdminComponents/Sidebar";
import { Outlet } from "react-router-dom";

import ScrollToTop from "../utils/ScrollToTop";

const AdminLayout = () => {
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
