import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const StickyNavbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check scroll direction to show/hide navbar
      if (
        currentScrollY > lastScrollY &&
        currentScrollY > window.innerHeight * 0.08
      ) {
        setIsVisible(false); // Hide navbar
      } else {
        setIsVisible(true); // Show navbar
      }

      // Change background color if scrolled past 45rem (~720px)
      if (currentScrollY > 150) {
        setIsScrolled(true); // White background
      } else {
        setIsScrolled(false); // Transparent background
      }

      setLastScrollY(currentScrollY); // Update last scroll position
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`fixed left-0 w-full z-50 shadow-md transition-all duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "bg-white" : "bg-transparent"}`}
    >
      <div
        className={`container mx-auto flex items-center justify-between py-4 px-6 ${
          isScrolled ? "text-gray-800" : "text-white"
        }`}
      >
        {/* Logo */}
        <div>
          <h2
            className={`text-2xl font-bold ${
              isScrolled ? "text-purple-600" : "text-white"
            }`}
          >
            Sierra
          </h2>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-5">
          <Link
            href="#solutions"
            className={`transition ${
              isScrolled ? "hover:text-purple-600 text-gray-800" : "text-white"
            }`}
          >
            Solutions
          </Link>
          <Link
            href="#pricing"
            className={`transition ${
              isScrolled ? "hover:text-purple-600 text-gray-800" : "text-white"
            }`}
          >
            About
          </Link>
          <Link
            to={"/services"}
            className={`transition ${
              isScrolled ? "hover:text-purple-600 text-gray-800" : "text-white"
            }`}
          >
            services
          </Link>
          <Link
            to={"/contact"}
            className={`transition ${
              isScrolled ? "hover:text-purple-600 text-gray-800" : "text-white"
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Button */}
        <div className="navbar-end flex gap-5">
          {token ? (
            <div>
              {user?.role === "user" ? (
                <Link
                  to={"/user/dashboard"}
                  className="btn bg-black text-white focus:ring-4 hover:text-black rounded-xl px-8 py-4 transition duration-300 ease-in-out"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to={"/admin/dashboard"}
                  className="btn bg-black text-white focus:ring-4 hover:text-black rounded-xl px-8 py-4 transition duration-300 ease-in-out"
                >
                  Dashboard
                </Link>
              )}
            </div>
          ) : (
            <>
              <Link
                to={"/login"}
                className="btn bg-black text-white focus:ring-4 hover:text-black rounded-xl px-8 py-4 transition duration-300 ease-in-out"
              >
                Log-in
              </Link>

              <Link
                to={"/sign-up"}
                className="btn bg-black text-white focus:ring-4 hover:text-black rounded-xl px-8 py-4 transition duration-300 ease-in-out"
              >
                Sign-up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StickyNavbar;
