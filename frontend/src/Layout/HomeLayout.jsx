import { Outlet } from "react-router-dom";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
import ScrollToTop from "../utils/ScrollToTop";

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen ">
        <ScrollToTop>
          <Outlet />
        </ScrollToTop>
      </div>
      <Footer />
    </>
  );
};

export default HomeLayout;
