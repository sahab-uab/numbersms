import { motion } from "framer-motion";

import { fadeInUp } from "../animation/Animation";
import TeamSection from "../Components/AboutPageComponents/TeamSection";
import CreativeTeamSection from "../Components/AboutPageComponents/CreativeTeamSection";
import HeroSection from "../Components/AboutPageComponents/HeroSection";
import OurMission from "../Components/AboutPageComponents/OurMission";
import OurValue from "../Components/AboutPageComponents/OurValue";
import GlobalImpactSection from "../Components/AboutPageComponents/GlobalImpactSection";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import CareersSection from "../Components/AboutPageComponents/CareersSection";

const AboutPage = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const [activeTab, setActiveTab] = useState("Mission");

  const tabs = [
    {
      name: "Mission",
      content:
        "We aim to simplify complex processes, enhance operational efficiency, and drive growth through our innovative software and services. By providing reliable solutions, we enable our clients to navigate the ever-changing tech landscape.",
    },
    {
      name: "Vision",
      content:
        "At the heart of our vision is a future where businesses harness the power of technology to achieve remarkable feats. We envision a world where every entrepreneur, startup, and enterprise has access to advanced tools.",
    },
    {
      name: "Values",
      content:
        "We uphold the highest ethical standards, ensuring transparency, honesty, and trust in all our interactions. Innovation fuels our creativity, driving us to explore new horizons and develop groundbreaking solutions.",
    },
  ];
  const brands = [
    {
      name: "Airbnb",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/512px-Airbnb_Logo_B%C3%A9lo.svg.png",
    },
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      name: "FedEx",
      logo: "https://sierra.keydesign.xyz/wp-content/uploads/2023/10/FedEx-Logo.png",
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
    {
      name: "Walmart",
      logo: "https://sierra.keydesign.xyz/wp-content/uploads/2023/10/Walmart-Logo.png",
    },
    {
      name: "OLA",
      logo: "https://sierra.keydesign.xyz/wp-content/uploads/2023/10/OLA-logo.png",
    },
    {
      name: "OYO",
      logo: "https://sierra.keydesign.xyz/wp-content/uploads/2023/10/OYO-Logo.png",
    },
    {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
  ];
  return (
    <div className="about-container">
      <div className="background-about">
        \{/* about-header */}
        <div className="about-header text-white">
          {" "}
          <h2 className="about-title">Got questions? This way.</h2>
          <p className="about-description">
            FAQs, quick fixes, and official info on every feature. Can not find
            your question here, try our support forums.
          </p>
          <div className="navigation">
            <Link to={"/"}>Home</Link>
            {pathnames.length > 0 && <span className="mx-2">›</span>}
            {pathnames.map((value, index) => {
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              return (
                <span key={to}>
                  <Link to={to} className="text-blue-500 capitalize">
                    {value}
                  </Link>
                  {index < pathnames.length - 1 && (
                    <span className="mx-2">›</span>
                  )}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div className="bg-white flex flex-col gap-[5rem]">
        {/* vision container */}
        <div className="vision-container">
          <div className="vision-left">
            <span className="vision-heading">What we do</span>
            <h4>
              We help global brands <br /> deliver <span>great results</span>
            </h4>
            <p>
              We are dedicated to crafting tech solutions that revolutionize the
              way businesses operate.
            </p>
          </div>
          <div className="vision-right">
            <div className="w-full max-w-2xl mx-auto">
              {/* Tab Buttons */}
              <div className="flex bg-gray-100 rounded-t-lg">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    className={`flex-1 py-2 text-center text-md font-semibold transition-all ${
                      activeTab === tab.name
                        ? "text-blue-600 bg-white shadow-sm"
                        : "text-gray-700"
                    }`}
                    onClick={() => setActiveTab(tab.name)}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-4 text-[18px] bg-gray-50 rounded-b-lg">
                {tabs.find((tab) => tab.name === activeTab)?.content}
              </div>
            </div>
          </div>
        </div>
        <div className="sponsors">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-xl p-6 flex items-center justify-center shadow-md"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-10 max-w-[120px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="team-section">
        <TeamSection />
      </div>

      <div className="career-section">
        <CareersSection />
      </div>

      <div className="cta-bg">
        {/* Small Label */}
        <button className="px-4 py-1 text-sm font-medium border border-gray-300 rounded-md text-white bg-black hover:bg-gray-800 transition">
          Lets talk
        </button>

        {/* Main Heading */}
        <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4">
          Got a <span className="text-blue-500">project</span> to discuss?{" "}
          <br />
          We had love to hear from you.
        </h2>

        {/* Description */}
        <p className="text-gray-400 mt-4 max-w-2xl">
          Grow sales and stay ahead in the competitive market by being among the
          first to benefit from our game-changing solutions.
        </p>

        {/* Call-to-Action Button */}
        <button className="mt-6 px-6 py-3 text-lg font-medium bg-white text-black rounded-full shadow-lg hover:bg-gray-200 transition">
          Get in touch
        </button>
      </div>
    </div>
  );
};

export default AboutPage;
