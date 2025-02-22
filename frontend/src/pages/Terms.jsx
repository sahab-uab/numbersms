import { useEffect, useRef, useState } from "react";

const Terms = () => {
  const termsoneRef = useRef(null);
  const termstwoRef = useRef(null);
  const termsthreeRef = useRef(null);
  const termsfourRef = useRef(null);
  const termsfiveRef = useRef(null);
  const [activeSection, setActiveSection] = useState("termsone");

  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.5,
      rootMargin: "0px 0px -10% 0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === termsoneRef.current) {
            setActiveSection("termsone");
          }
          if (entry.target === termstwoRef.current) {
            setActiveSection("termtwo");
          }
          if (entry.target === termsthreeRef.current) {
            setActiveSection("termsthree");
          }
          if (entry.target === termsfourRef.current) {
            setActiveSection("termsfour");
          }
          if (entry.target === termsfiveRef.current) {
            setActiveSection("termsfive");
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    if (termsoneRef.current) observer.observe(termsoneRef.current);
    if (termstwoRef.current) observer.observe(termstwoRef.current);
    if (termsthreeRef.current) observer.observe(termsthreeRef.current);
    if (termsfourRef.current) observer.observe(termsfourRef.current);
    if (termsfiveRef.current) observer.observe(termsfiveRef.current);

    return () => {
      if (termsoneRef.current) observer.unobserve(termsoneRef.current);
      if (termstwoRef.current) observer.unobserve(termstwoRef.current);
      if (termsthreeRef.current) observer.unobserve(termsthreeRef.current);
      if (termsfourRef.current) observer.unobserve(termsfourRef.current);
      if (termsfiveRef.current) observer.unobserve(termsfiveRef.current);
    };
  }, []);

  const handleScrollToSection = (section) => {
    if (section === "termsone" && termsoneRef.current) {
      termsoneRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (section === "termstwo" && termstwoRef.current) {
      termstwoRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (section === "termsthree" && termsthreeRef.current) {
      termsthreeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (section === "termsfour" && termsfourRef.current) {
      termsfourRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (section === "termsfive" && termsfiveRef.current) {
      termsfiveRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <div className="terms-container">
      {/* terms headline */}

      <div className="terms-headline-container background">
        <div className="terms-headline text-white">
          <h4>Terms and conditions</h4>
          <p className="text-white">Last modified: November 15, 2023</p>
        </div>
      </div>

      {/* terms menu */}
      <div className="terms-menu-container">
        <div className="terms-menu-left">
          <ul>
            <li
              onClick={() => handleScrollToSection("termsone")}
              className={`${
                activeSection === "termsone" ? "text-blue-600 font-bold" : ""
              } cursor-pointer`}
            >
              Our services
            </li>
            <li
              onClick={() => handleScrollToSection("termstwo")}
              className={` ${
                activeSection === "termstwo" ? "text-blue-600 font-bold " : ""
              } cursor-pointer`}
            >
              Property rights
            </li>
            <li
              onClick={() => handleScrollToSection("termsthree")}
              className={`${
                activeSection === "termsthree" ? "text-blue-600 font-bold" : ""
              } cursor-pointer`}
            >
              Prohibited activities
            </li>
            <li
              onClick={() => handleScrollToSection("termsfour")}
              className={`${
                activeSection === "termsfour" ? "text-blue-600 font-bold" : ""
              } cursor-pointer`}
            >
              Services management
            </li>
            <li
              onClick={() => handleScrollToSection("termsfive")}
              className={`${
                activeSection === "termsfive" ? "text-blue-600 font-bold" : ""
              } cursor-pointer`}
            >
              Contact information
            </li>
          </ul>
        </div>
        <div className="terms-menu-right">
          {/* terms-1 */}
          <div id="#" ref={termsoneRef} className="terms">
            <h4>Our Services</h4>
            <p>
              Discover the basics of WordPress themes, including their
              importance for creating a unique web presence, compatibility with
              the latest WordPress version, usage of demo content, and
              assistance for theme installation.
            </p>
            <p>
              Discover the basics of WordPress themes, including their
              importance for creating a unique web presence, compatibility with
              the latest WordPress version, usage of demo content, and
              assistance for theme installation.
            </p>
          </div>

          {/* terms-2  */}
          <div id="#" ref={termstwoRef} className="terms">
            <h4>Property rights</h4>
            <p>
              Discover the basics of WordPress themes, including their
              importance for creating a unique web presence, compatibility with
              the latest WordPress version, usage of demo content, and
              assistance for theme installation.
            </p>
            <p>
              Discover the basics of WordPress themes, including their
              importance for creating a unique web presence, compatibility with
              the latest WordPress version, usage of demo content, and
              assistance for theme installation.
            </p>
          </div>

          {/* terms-3 */}
          <div id="#" ref={termsthreeRef} className="terms">
            <h4>Prohibited activities</h4>
            <p>
              Discover the basics of WordPress themes, including their
              importance for creating a unique web presence, compatibility with
              the latest WordPress version, usage of demo content, and
              assistance for theme installation.
            </p>
            <p>
              Discover the basics of WordPress themes, including their
              importance for creating a unique web presence, compatibility with
              the latest WordPress version, usage of demo content, and
              assistance for theme installation.
            </p>
          </div>
          {/* terms-4 */}
          <div id="#" ref={termsfourRef} className="terms">
            <h4>Services management</h4>
            <p>
              Discover the basics of WordPress themes, including their
              importance for creating a unique web presence, compatibility with
              the latest WordPress version, usage of demo content, and
              assistance for theme installation.
            </p>
            <p>
              Discover the basics of WordPress themes, including their
              importance for creating a unique web presence, compatibility with
              the latest WordPress version, usage of demo content, and
              assistance for theme installation.
            </p>
          </div>
          {/* terms-5 */}
          <div id="#" ref={termsfiveRef} className="terms">
            <h4>Contact information</h4>
            <p>
              Discover the basics of WordPress themes, including their
              importance for creating a unique web presence, compatibility with
              the latest WordPress version, usage of demo content, and
              assistance for theme installation.
            </p>
            <p>
              Discover the basics of WordPress themes, including their
              importance for creating a unique web presence, compatibility with
              the latest WordPress version, usage of demo content, and
              assistance for theme installation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
