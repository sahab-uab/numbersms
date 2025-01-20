import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "../pages/user/SideBar";

const UserLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="flex gap-5">
        <div>
          <SideBar />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
