import React from "react";
import CurvedBackground from "../Components/Contract/CurvedBackground";
import InfoSection from "../Components/Contract/InfoSection";
import MapSection from "../Components/Contract/MapSection";
import LastSection from "../Components/Contract/LastSection";

const ContactPage = () => {
  return (
    <div className="">
      <div className="mb-52 min-h-screen">
        <CurvedBackground />
      </div>
      <div>
        <InfoSection />
      </div>
      {/* map section */}
      <div>
        <MapSection />
      </div>
      <div className="w-full">
        <LastSection />
      </div>
    </div>
  );
};

export default ContactPage;
