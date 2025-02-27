import CurvedBackground from "../Components/Contract/CurvedBackground";
import InfoSection from "./../Components/Contract/InfoSection";
import MapSection from "./../Components/Contract/MapSection";
import LastSection from "./../Components/Contract/LastSection";
import FormSection from "./../Components/Contract/FormSection";

const ContactPage = () => {
  // Dynamic data for the CurvedBackground
  const backgroundData = {
    bgImage: "../../../background-image.jpg",
    heading: "Connect",
    highlightedText: "with us",
    subtitle:
      "We’re here to help! Reach out and our team will respond as soon as possible.",
    formComponent: <FormSection />, // Pass a different form component if needed
  };

  return (
    <div>
      <div className="mb-10 lg:mb-52 lg:min-h-screen">
        <CurvedBackground {...backgroundData} />
      </div>
      <div>
        <InfoSection />
      </div>
      {/* Map section */}
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
