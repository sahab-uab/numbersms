import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-base-100 container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/about"}>About</Link>
              </li>
              <li>
                <Link to={"/services"}>Service</Link>
              </li>
              <li>
                <Link to={"/contact"}>Contact</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link to={"/"} className="btn btn-ghost text-xl">
            Number-SMS
          </Link>
        </div>
        <div className="navbar-end flex gap-5">
          <Link
            to={"/login"}
            className="btn bg-black  text-white focus:ring-4 hover:text-black  rounded-xl px-8 py-4 transition duration-300 ease-in-out"
          >
            Log-in
          </Link>

          <Link
            to={"/sign-up"}
            className="btn bg-black text-white  focus:ring-4 hover:text-black   rounded-xl px-8 py-4 transition duration-300 ease-in-out"
          >
            Sign-up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
