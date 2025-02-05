import { Outlet } from "react-router-dom";
import UserSidebar from "../Components/UserComponents/UserSidebar";
import TokenRefreshOnRouteChange from "../utils/TokenRefreshOnRouteChange";

const UserLayout = () => {
  return (
    <div className="flex container mx-auto">
      <TokenRefreshOnRouteChange />
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
