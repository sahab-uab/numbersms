import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart2,
  ArrowRightLeft,
  Menu,
  X,
  ChevronDown,
  Sliders,
  Shield,
  MessageCircleDashed,
  ServerCrash,
  ServerCrashIcon,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      link: "/admin/dashboard",
    },
    {
      icon: Users,
      label: "All users",
      link: "/admin/users",
    },
    {
      icon: ArrowRightLeft,
      label: "All Transation",
      link: "/admin/transations",
    },
    {
      icon: BarChart2,
      label: "Credit",
      link: "/admin/user/add/cadit",
    },
    {
      icon: MessageCircleDashed,
      label: "SMS Usages",
      link: "/admin/smsusages",
    },
    // {
    //   icon: ServerCrashIcon,
    //   label: "Add Service Image",
    //   link: "/admin/service-image",
    // },
    {
      icon: ServerCrashIcon,
      label: "Service",
      subItems: [
        {
          icon: Sliders,
          label: "All Services",
          link: "/admin/allservice",
        },
        {
          icon: Sliders,
          label: "Add Service Image",
          link: "/admin/service-image",
        },
        {
          icon: Sliders,
          label: "Add Discount",
          link: "/admin/add-discount",
        },
      ],
    },
    {
      icon: Settings,
      label: "Settings",
      subItems: [
        {
          icon: Sliders,
          label: "Account Settings",
          link: "/admin/accout/settings",
        },
      ],
    },
  ];

  const toggleSubmenu = (label) => {
    setExpandedMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white h-screen shadow-lg overflow-y-auto flex flex-col transition-all duration-300`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          {isSidebarOpen && (
            <h1 className="text-lg font-bold text-gray-800">NumberSMS</h1>
          )}
          <button
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
              setExpandedMenus([]); // Collapse all menus when sidebar is closed
            }}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-3 py-4">
          {navItems.map((item, index) => (
            <div key={index}>
              {item.subItems ? (
                <div
                  onClick={() => {
                    if (item.subItems) toggleSubmenu(item.label);
                  }}
                  className="flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-100"
                >
                  {React.createElement(item.icon, {
                    size: 22,
                    className: "text-gray-600",
                  })}
                  {isSidebarOpen && (
                    <>
                      <span className="ml-3 flex-1 text-gray-700">
                        {item.label}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          expandedMenus.includes(item.label) ? "rotate-180" : ""
                        }`}
                      />
                    </>
                  )}
                </div>
              ) : (
                <Link
                  to={item.link}
                  className="flex items-center p-3 rounded-lg cursor-pointer text-gray-600 hover:bg-gray-200 transition-all duration-200"
                >
                  {React.createElement(item.icon, { size: 22 })}
                  {isSidebarOpen && <span className="ml-3">{item.label}</span>}
                </Link>
              )}

              {isSidebarOpen &&
                item.subItems &&
                expandedMenus.includes(item.label) && (
                  <div className="ml-6 mt-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.link}
                        className="flex items-center p-2 rounded-lg cursor-pointer text-gray-600 hover:bg-gray-200 transition-all duration-200"
                      >
                        {React.createElement(subItem.icon, { size: 16 })}
                        <span className="ml-2">{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="text-white bg-red-500 px-5 py-3"
        >
          Logout
        </button>
      </aside>
    </div>
  );
};

export default Sidebar;
