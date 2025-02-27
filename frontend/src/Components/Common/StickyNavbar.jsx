import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { LuMenu } from "react-icons/lu";
import { LuX } from "react-icons/lu"; // Import cross icon for closing the mobile menu

const StickyNavbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check scroll direction to show/hide navbar
      if (
        currentScrollY > lastScrollY &&
        currentScrollY > window.innerHeight * 0.08
      ) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      if (currentScrollY > 150) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const openMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <>
      {!mobileMenu ? (
        <div
          className={`fixed left-0 w-full z-50 shadow-md transition-all duration-500 ${
            isVisible ? "translate-y-0" : "-translate-y-full"
          } ${isScrolled ? "bg-white" : "bg-transparent"}`}
        >
          <div className="hidden lg:block">
            <div
              className={`navbar-container  ${
                isScrolled ? "text-gray-800" : "text-white"
              }  `}
            >
              <div className="navbar ">
                <div className="brand">
                  <h2>Number SMS</h2>
                </div>
                <ul className={`nav-links`}>
                  <li className={`${isScrolled ? "nav-link-2" : "nav-link"}`}>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li className={`${isScrolled ? "nav-link-2" : "nav-link"}`}>
                    <NavLink to="/about">About Us</NavLink>
                  </li>
                  <li className={`${isScrolled ? "nav-link-2" : "nav-link"}`}>
                    <NavLink to="/contact">Contact Us</NavLink>
                  </li>
                </ul>
                <div className=" mt-6 flex gap-5">
                  <NavLink
                    to={"/login"}
                    onClick={() => setMobileMenu(false)}
                    className={`bg-[#824DEB] w-full hover:bg-white text-white hover:text-[#824DEB] px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center space-x-2 transition`}
                  >
                    {"Login"}
                  </NavLink>
                  or
                  <NavLink
                    to="/register"
                    className={`bg-[#824DEB] w-full hover:bg-white text-white hover:text-[#824DEB] px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center space-x-2 transition`}
                    onClick={() => setMobileMenu(false)}
                  >
                    Register
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="block lg:hidden">
            <div
              className={`navbar-container px-2 ${
                isScrolled ? "text-gray-800" : "text-white"
              }  `}
            >
              <div className="navbar flex justify-between">
                <div className="brand">
                  <h2>Number SMS</h2>
                </div>
                <div className="">
                  <button onClick={openMenu} className="">
                    <LuMenu className="text-4xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="fixed inset-0 bg-white flex  justify-center z-50">
            {/* White background */}
            <div className="flex flex-col  space-y-6">
              <button
                onClick={() => setMobileMenu(false)}
                className="absolute top-4 right-4 text-3xl text-gray-800"
              >
                <LuX />
              </button>

              {/* Navigation Links */}
              <NavLink
                to="/"
                className="text-gray-800 text-3xl font-semibold nav-link-2"
                onClick={() => setMobileMenu(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className="text-gray-800 text-3xl font-semibold nav-link-2"
                onClick={() => setMobileMenu(false)}
              >
                About
              </NavLink>
              <NavLink
                to="/services"
                className="text-gray-800 text-3xl font-semibold nav-link-2"
                onClick={() => setMobileMenu(false)}
              >
                Services
              </NavLink>
              <NavLink
                to="/contact"
                className="text-gray-800 text-3xl font-semibold nav-link-2"
                onClick={() => setMobileMenu(false)}
              >
                Contact
              </NavLink>

              {/* Login and Registration Buttons */}
              <div className="space-y-4 mt-6">
                <Link
                  to={"/login"}
                  onClick={() => setMobileMenu(false)}
                  className={`bg-[#824DEB] w-full hover:bg-white text-white hover:text-[#824DEB] px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center space-x-2 transition`}
                >
                  {"Login"}
                </Link>
                <NavLink
                  to="/register"
                  className={`bg-[#824DEB] w-full hover:bg-white text-white hover:text-[#824DEB] px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center space-x-2 transition`}
                  onClick={() => setMobileMenu(false)}
                >
                  Register
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StickyNavbar;
