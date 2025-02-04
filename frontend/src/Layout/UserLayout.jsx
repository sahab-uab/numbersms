import { Outlet } from "react-router-dom";
import UserSidebar from "../Components/UserComponents/UserSidebar";

const UserLayout = () => {
  return (
    <div className="flex container mx-auto">
      <div className="">
        <UserSidebar />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
