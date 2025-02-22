import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

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
        className={`navbar-container  ${
          isScrolled ? "text-gray-800" : "text-white"
        }  `}
      >
        <div className="navbar">
          <div className="brand">
            {/* <img src="" alt="brand" /> */}
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
            <li className={`${isScrolled ? "nav-link-2" : "nav-link"}`}>
              <NavLink to="/terms-and-conditions">Terms & Conditions</NavLink>
            </li>

            <li className={`${isScrolled ? "nav-link-2" : "nav-link"}`}>
              <NavLink to="/faq">FAQ</NavLink>
            </li>
          </ul>
          <Link to="/login">Get Started</Link>
        </div>
      </div>
    </div>
  );
};

export default StickyNavbar;
