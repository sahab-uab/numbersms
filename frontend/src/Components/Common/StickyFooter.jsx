import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-10 px-6    mt-20">
      {/* Top Section */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        {/* Logo and Description */}
        <div className="sm:col-span-2">
          <h2 className="text-purple-600 text-2xl font-bold">Number-SmS</h2>
          <p className="mt-4 text-sm">
            Our beautiful designs open the door to a realm of limitless
            possibilities, where imagination knows no bounds.
          </p>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-lg font-semibold">Features</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Page builder</li>
            <li>Theme options</li>
            <li>Theme builder</li>
            <li>Template library</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold">Resources</h3>
          <ul className="mt-4 md:mt-0 flex flex-col">
            <li className={"nav-link"}>
              <NavLink to="/terms-and-conditions">Terms & Conditions</NavLink>
            </li>
            <li className={"nav-link"}>
              <NavLink to="/faq">FAQ</NavLink>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold">Follow us</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <a>Behance</a>
            <li>Dribbble</li>
            <li>Facebook</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto mt-10 border-t border-gray-300 pt-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-gray-600 text-center md:text-left">
          © KeyDesign WordPress Theme. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
