import { Outlet } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";
import StickyFooter from "../Components/Common/StickyFooter";
import StickyNavbar from "../Components/Common/StickyNavbar";

const HomeLayout = () => {
  return (
    <>
      <StickyNavbar />
      <div className="bg-base-100 z-[9999]">
        <ScrollToTop>
          <Outlet />
        </ScrollToTop>
      </div>
      {/* <Footer /> */}
      <div className="sticky bottom-0 -z-[2] ">
        <StickyFooter />
      </div>
    </>
  );
};

export default HomeLayout;
