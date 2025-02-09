import { Outlet } from "react-router-dom";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
import ScrollToTop from "../utils/ScrollToTop";
import StickyFooter from "../Components/Common/StickyFooter";
import StickyNavbar from "../Components/Common/StickyNavbar";

const HomeLayout = () => {
  return (
    <>
      <StickyNavbar />
      <div className="min-h-screen bg-base-100">
        <ScrollToTop>
          <Outlet />
        </ScrollToTop>
      </div>
      {/* <Footer /> */}
      <StickyFooter />
    </>
  );
};

export default HomeLayout;
