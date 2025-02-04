import { Outlet } from "react-router-dom";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen ">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default HomeLayout;
