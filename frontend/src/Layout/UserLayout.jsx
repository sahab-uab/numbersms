import { Outlet } from "react-router-dom";
import UserSidebar from "../Components/UserComponents/UserSidebar";
import TokenRefreshOnRouteChange from "../utils/TokenRefreshOnRouteChange";
import ScrollToTop from "../utils/ScrollToTop";

const UserLayout = () => {
  return (
    <div className="flex container mx-auto">
      <TokenRefreshOnRouteChange />
      <div className="">
        <UserSidebar />
      </div>
      <div className="flex-1">
        <ScrollToTop>
          <Outlet />
        </ScrollToTop>
      </div>
    </div>
  );
};

export default UserLayout;
