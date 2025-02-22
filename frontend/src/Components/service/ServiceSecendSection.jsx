import DynamicSection from "../Common/DynamicSection";

const ServiceSecendSection = () => {
  const features = [
    {
      title: "Real-time tracking",
      description: "Monitor activities and conversions instantly.",
    },
    {
      title: "Performance analytics",
      description: "Identify top performers, and optimize.",
    },
    {
      title: "Payout automation",
      description: "Seamless and timely transactions.",
    },
  ];
  // bg-[#F5F5FF]
  return (
    <div className="wrapper grid md:grid-cols-2 items-center justify-center  overflow-hidden  gap-5">
      <div className="bg-[#F5F5FF] p-10 ">
        <div className="w-full h-full">
          <img
            src="https://sierra.keydesign.xyz/wp-content/uploads/2023/10/sierra-services-3.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div>
        <DynamicSection
          features={features}
          title={"Intuitive Dashboard"}
          subtitle={"Maximize your affiliate marketing efforts"}
          description={
            "Monitor activities, track conversions, and optimize performance, all  from a user-friendly dashboard."
          }
        />
      </div>
    </div>
  );
};

export default ServiceSecendSection;
