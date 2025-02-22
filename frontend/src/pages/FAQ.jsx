import { Link, NavLink } from "react-router-dom";
import { MdOutlineKeyboardArrowRight, MdOutlineClose } from "react-icons/md";

import { useEffect, useRef, useState } from "react";

const FAQ = () => {
  const generalRef = useRef(null);
  const licenseRef = useRef(null);
  const supportRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(null);
  const [activeSection, setActiveSection] = useState("General Questions");

  useEffect(() => {
    const observerOptions = { root: null, threshold: 0.4 };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === generalRef.current) {
            setActiveSection("General Questions");
          }
          if (entry.target === licenseRef.current) {
            setActiveSection("License Usage");
          }
          if (entry.target === supportRef.current) {
            setActiveSection("Support & Update");
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    if (generalRef.current) observer.observe(generalRef.current);
    if (licenseRef.current) observer.observe(licenseRef.current);
    if (supportRef.current) observer.observe(supportRef.current);

    return () => {
      if (generalRef.current) observer.unobserve(generalRef.current);
      if (licenseRef.current) observer.unobserve(licenseRef.current);
      if (supportRef.current) observer.unobserve(supportRef.current);
    };
  }, []);

  const handleScrollToSection = (section) => {
    if (section === "General Questions" && generalRef.current) {
      generalRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (section === "License Usage" && licenseRef.current) {
      licenseRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (section === "Support & Update" && supportRef.current) {
      supportRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const handleQuestion = (num) => {
    setActiveIndex((prevIndex) => (prevIndex === num ? null : num));
  };

  return (
    <div className="faq-container">
      <div className="background">
        {/* navbar content */}
        <div className="navbar-container ">
          <div className="navbar">
            <div className="brand">
              {/* <img src="" alt="brand" /> */}
              <h2>Number SMS</h2>
            </div>
            <ul className="nav-links">
              <li className="nav-link">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="nav-link">
                <NavLink to="/terms-and-conditions">Terms & Conditions</NavLink>
              </li>
              <li className="nav-link">
                <NavLink to="/about-us">About Us</NavLink>
              </li>
              <li className="nav-link">
                <NavLink to="/faq">FAQ</NavLink>
              </li>
            </ul>
            <Link to="">Get Started</Link>
          </div>
        </div>

        {/* Faq-header */}
        <div className="faq-header">
          {" "}
          <h2 className="faq-title">Got questions? This way.</h2>
          <p className="faq-description">
            FAQs, quick fixes, and official info on every feature. <br />
            Can not find your question here, try our support forums.
          </p>
        </div>
      </div>
      {/* faq menu */}
      <div className="faq-menu-container">
        <div className="faq-menu-left">
          <ul>
            <li
              onClick={() => handleScrollToSection("General Questions")}
              className={`${
                activeSection === "General Questions"
                  ? "text-blue-600 font-bold"
                  : ""
              } cursor-pointer`}
            >
              General Questions
            </li>
            <li
              onClick={() => handleScrollToSection("License Usage")}
              className={` ${
                activeSection === "License Usage"
                  ? "text-blue-600 font-bold "
                  : ""
              } cursor-pointer`}
            >
              License usage
            </li>
            <li
              onClick={() => handleScrollToSection("Support & Update")}
              className={`${
                activeSection === "Support & Update"
                  ? "text-blue-600 font-bold"
                  : ""
              } cursor-pointer`}
            >
              Support & Update
            </li>
          </ul>
        </div>
        <div className="faq-menu-right">
          {/* general ques */}
          <div id="#" ref={generalRef} className="general-questions">
            <h4>General questions:</h4>
            <p>
              Discover the basics of WordPress themes, including their
              importance for creating a unique web presence, compatibility with
              the latest WordPress version, usage of demo content, and
              assistance for theme installation.
            </p>

            <div className="quesions flex flex-col gap-[1rem]">
              {[1, 2, 3].map((num) => (
                <>
                  <div className="question">
                    <div
                      onClick={() => handleQuestion(num)}
                      className="question-one"
                    >
                      <p>
                        {num}. What is a WordPress theme, and why do I need one?
                      </p>
                      {activeIndex === num ? (
                        <span>
                          <MdOutlineClose />
                        </span>
                      ) : (
                        <span>
                          <MdOutlineKeyboardArrowRight />
                        </span>
                      )}
                    </div>

                    <p
                      className={`${
                        activeIndex === num
                          ? "max-h-40 opacity-100 pl-8 pr-8 pb-8"
                          : "max-h-0 opacity-0"
                      } overflow-hidden transition-all duration-300`}
                    >
                      Cras eget leo in quam euismod viverra et luctus tellus.
                      Nullam porta euismod est sodales cursus. In lacinia,
                      mauris quis volutpat tempor, nulla turpis vulputate magna,
                      ut elementum turpis leo vel libero.
                    </p>
                  </div>
                </>
              ))}
            </div>
          </div>

          {/* license  */}
          <div id="#" ref={licenseRef} className="general-questions">
            <h4>License usage:</h4>
            <p>
              Discover the basics of WordPress themes, including their
              importance for creating a unique web presence, compatibility with
              the latest WordPress version, usage of demo content, and
              assistance for theme installation.
            </p>

            <div className="quesions flex flex-col gap-[1rem]">
              {[4, 5, 6].map((num) => (
                <>
                  <div className="question">
                    <div
                      onClick={() => handleQuestion(num)}
                      className="question-one"
                    >
                      <p>
                        {num}. What is a WordPress theme, and why do I need one?
                      </p>
                      {activeIndex === num ? (
                        <span>
                          <MdOutlineClose />
                        </span>
                      ) : (
                        <span>
                          <MdOutlineKeyboardArrowRight />
                        </span>
                      )}
                    </div>

                    <p
                      className={`${
                        activeIndex === num
                          ? "max-h-40 opacity-100 pl-8 pr-8 pb-8"
                          : "max-h-0 opacity-0"
                      } overflow-hidden transition-all duration-300`}
                    >
                      Cras eget leo in quam euismod viverra et luctus tellus.
                      Nullam porta euismod est sodales cursus. In lacinia,
                      mauris quis volutpat tempor, nulla turpis vulputate magna,
                      ut elementum turpis leo vel libero.
                    </p>
                  </div>
                </>
              ))}
            </div>
          </div>

          {/* support */}
          <div id="#" ref={supportRef} className="general-questions">
            <h4>Support & updates::</h4>
            <p>
              Discover the basics of WordPress themes, including their
              importance for creating a unique web presence, compatibility with
              the latest WordPress version, usage of demo content, and
              assistance for theme installation.
            </p>

            <div className="quesions flex flex-col gap-[1rem]">
              {[7, 8, 9].map((num) => (
                <>
                  <div className="question">
                    <div
                      onClick={() => handleQuestion(num)}
                      className="question-one"
                    >
                      <p>
                        {num}. What is a WordPress theme, and why do I need one?
                      </p>
                      {activeIndex === num ? (
                        <span>
                          <MdOutlineClose />
                        </span>
                      ) : (
                        <span>
                          <MdOutlineKeyboardArrowRight />
                        </span>
                      )}
                    </div>

                    <p
                      className={`${
                        activeIndex === num
                          ? "max-h-40 opacity-100 pl-8 pr-8 pb-8"
                          : "max-h-0 opacity-0"
                      } overflow-hidden transition-all duration-300`}
                    >
                      Cras eget leo in quam euismod viverra et luctus tellus.
                      Nullam porta euismod est sodales cursus. In lacinia,
                      mauris quis volutpat tempor, nulla turpis vulputate magna,
                      ut elementum turpis leo vel libero.
                    </p>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
