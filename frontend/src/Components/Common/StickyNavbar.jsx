import React, { useEffect, useState } from "react";

const StickyNavbar = () => {
  const [isVisible, setIsVisible] = useState(true); // Navbar visibility
  const [lastScrollY, setLastScrollY] = useState(0); // Last scroll position
  const [isScrolled, setIsScrolled] = useState(false); // Background color toggle

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
        <div className="hidden md:flex space-x-6">
          <a
            href="#solutions"
            className={`transition ${
              isScrolled ? "hover:text-purple-600 text-gray-800" : "text-white"
            }`}
          >
            Solutions
          </a>
          <a
            href="#pricing"
            className={`transition ${
              isScrolled ? "hover:text-purple-600 text-gray-800" : "text-white"
            }`}
          >
            Pricing
          </a>
          <a
            href="#help"
            className={`transition ${
              isScrolled ? "hover:text-purple-600 text-gray-800" : "text-white"
            }`}
          >
            Help
          </a>
          <a
            href="#contact"
            className={`transition ${
              isScrolled ? "hover:text-purple-600 text-gray-800" : "text-white"
            }`}
          >
            Contact
          </a>
        </div>

        {/* Button */}
        <div>
          <button
            className={`py-2 px-6 rounded-lg font-semibold transition ${
              isScrolled
                ? "bg-purple-600 text-white hover:bg-purple-500"
                : "bg-white text-purple-600 hover:bg-gray-100"
            }`}
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyNavbar;
