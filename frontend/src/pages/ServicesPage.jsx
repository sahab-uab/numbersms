import React from "react";
import CurvedBackground from "../Components/Contract/CurvedBackground";
import ServiceHeroSections from "../Components/service/ServiceHeroSections";
import ServiceSecendSection from "../Components/service/ServiceSecendSection";

const ServicesPage = () => {
  const backgroundData = {
    bgImage:
      "https://sierra.keydesign.xyz/web-app/wp-content/uploads/sites/4/2023/10/webapp-bg-drk.jpg", // Replace with a dynamic background URL
    // heading: "Our services and solutions",
    highlightedText: "Our services and solutions",
    subtitle:
      "Discover how our tech solutions can transform your business. Explore our features and take your business to new heights.",
    formComponent: <ServiceHeroSections />, // Pass a different form component if needed
  };
  return (
    <div>
      <div className="mb-52 min-h-screen">
        <CurvedBackground {...backgroundData} />
      </div>

      <ServiceSecendSection />
    </div>
  );
};

export default ServicesPage;
