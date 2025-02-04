import { useTheme } from "../Context/ThemeContext";

const Footer = () => {
  const { darkMode } = useTheme();

  return (
    <footer
      className={`${
        darkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-600"
      } py-12`}
    >
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Company Section */}
        <div>
          <h3
            className={`text-lg font-bold ${
              darkMode ? "text-gray-200" : "text-gray-800"
            } mb-4`}
          >
            COMPANY
          </h3>
          <ul>
            <li>
              <a
                href="#"
                className={`hover:${
                  darkMode ? "text-white" : "text-gray-900"
                } transition`}
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`hover:${
                  darkMode ? "text-white" : "text-gray-900"
                } transition`}
              >
                Terms and Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Help Section */}
        <div>
          <h3
            className={`text-lg font-bold ${
              darkMode ? "text-gray-200" : "text-gray-800"
            } mb-4`}
          >
            HELP
          </h3>
          <ul>
            <li>
              <a
                href="#"
                className={`hover:${
                  darkMode ? "text-white" : "text-gray-900"
                } transition`}
              >
                How to register services online without bans
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`hover:${
                  darkMode ? "text-white" : "text-gray-900"
                } transition`}
              >
                Temporary numbers for OpenAI: An Easy Guide
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3
            className={`text-lg font-bold ${
              darkMode ? "text-gray-200" : "text-gray-800"
            } mb-4`}
          >
            CONTACT US
          </h3>
          <ul>
            <li>
              <a
                href="#"
                className={`hover:${
                  darkMode ? "text-white" : "text-gray-900"
                } transition`}
              >
                Online chat
              </a>
            </li>
            <li>
              <a
                href="mailto:"
                className={`hover:${
                  darkMode ? "text-white" : "text-gray-900"
                } transition`}
              >
                Email:
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`hover:${
                  darkMode ? "text-white" : "text-gray-900"
                } transition`}
              >
                Dispute / Fraud Inquiry
              </a>
            </li>
            <li>
              <span
                className={`hover:${
                  darkMode ? "text-white" : "text-gray-900"
                } transition`}
              >
                Phone:
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div
        className={`border-t mt-12 pt-6 text-center text-sm ${
          darkMode ? "border-gray-700" : "border-gray-300"
        }`}
      >
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
