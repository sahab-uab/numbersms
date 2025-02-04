import { Code2, Sun, Moon } from "lucide-react";
import { useTheme } from "../Context/ThemeContext";
import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const { darkMode, setDarkMode } = useTheme();
  const location = useLocation();

  const links = [
    { name: "Home", link: "/" },
    { name: "Services", link: "/services" },
    { name: "Pricing", link: "/price" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-6 py-4 z-50 transition-colors duration-300 shadow-md ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800 z-[9996]"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center space-x-2">
            <Code2
              className={`h-8 w-8 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            />
            <Link to="/" className="text-xl font-bold">
              <span className="text-xl font-bold">NumberSms</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex space-x-8">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.link}
                  className={`transition uppercase ${
                    location.pathname === link.link
                      ? darkMode
                        ? "text-blue-400 font-bold"
                        : "text-blue-600 font-bold"
                      : darkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Dark Mode Toggle Button */}
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className={`text-sm font-medium transition ${
                darkMode
                  ? "text-blue-400 hover:text-white underline"
                  : "text-blue-600 hover:text-blue-800 underline"
              }`}
            >
              Sign In
            </Link>
            <span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              or
            </span>
            <Link
              to="/sign-up"
              className={`text-sm font-medium transition ${
                darkMode
                  ? "text-blue-400 hover:text-white underline"
                  : "text-blue-600 hover:text-blue-800 underline"
              }`}
            >
              Sign Up
            </Link>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors duration-200 ${
                darkMode
                  ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              }`}
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
